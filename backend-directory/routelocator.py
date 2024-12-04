from typing import Dict
from pydantic import BaseModel
import requests
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())

#front end gets route, backend gets route from front end, geocodes route, returns important info

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Angular default port
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

HERE_API_KEY = 'Dj8ma2p3D0zH0tBOcdn13L-7y9Z6L0lePzIo3Clw030'
GEOCODE_BASE_URL = "https://geocode.search.hereapi.com/v1/geocode"
ROUTE_BASE_URL = "https://router.hereapi.com/v8/routes"

class LocationRequest(BaseModel):
    origin: str
    destination: str

class RouteResponse(BaseModel):
    car_route: Dict
    pedestrian_route: Dict
    bicycle_route: Dict

def geocode_address(address: str) -> tuple:
    """Geocode an address using HERE Geocoding API"""
    params = {
        'q': address,
        'apiKey': HERE_API_KEY
    }
    
    response = requests.get(GEOCODE_BASE_URL, params=params)
    
    if response.status_code != 200:
        raise HTTPException(status_code=500, 
                          detail="Geocoding service failed")
    
    result = response.json()
    
    if not result['items']:
        raise HTTPException(status_code=400, 
                          detail=f"Could not geocode address: {address}")
    
    position = result['items'][0]['position']
    return position['lat'], position['lng']

def get_route(origin_coords: tuple, dest_coords: tuple, transport_mode: str) -> Dict:
    """Get route using HERE Routing API"""
    params = {
        'apiKey': HERE_API_KEY,
        'origin': f"{origin_coords[0]},{origin_coords[1]}",
        'destination': f"{dest_coords[0]},{dest_coords[1]}",
        'transportMode': transport_mode,
        'return': 'summary,polyline'
    }
    
    response = requests.get(ROUTE_BASE_URL, params=params)
    
    if response.status_code != 200:
        raise HTTPException(status_code=500, 
                          detail=f"Failed to get {transport_mode} route")
    
    return response.json()

@app.post("/api/retrieveRoutes", response_model=RouteResponse)
async def generate_routes(locations: LocationRequest):
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=3001)
