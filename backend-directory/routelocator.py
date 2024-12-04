from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict
from agent import process_agent_query
from custom_types import AgentRequest, AgentResponse, LocationRequest, RouteResponse
from shared_utils import geocode_address, get_route

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/agent", response_model=AgentResponse)
async def agent_endpoint(request: AgentRequest):
    try:
        response = process_agent_query(request.query)
        return AgentResponse(**response)
    except Exception as e:
        return AgentResponse(
            status="error",
            error=str(e),
            metadata={"error_type": type(e).__name__}
        )

@app.post("/api/retrieveRoutes", response_model=RouteResponse)
async def generate_routes(locations: LocationRequest):
    try:
        # Geocode addresses
        origin_coords = geocode_address(locations.origin)
        dest_coords = geocode_address(locations.destination)
        
        # Get routes for different transport modes
        routes = {}
        transport_modes = ['car', 'pedestrian', 'bicycle']
        
        for mode in transport_modes:
            route = get_route(origin_coords, dest_coords, mode)
            routes[f"{mode}_route"] = route
        
        return RouteResponse(**routes)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=3001)