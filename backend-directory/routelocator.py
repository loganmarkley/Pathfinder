from pydantic import BaseModel
import requests
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())

#front end gets route, backend gets route from front end, geocodes route, returns important info

app = FastAPI()

class RouteRequest(BaseModel):
    startAddress: str
    endAddress: str

@app.post("/api/retrieveRoutes")
async def post_data(request: Request):
    payload = await request.json()
    start, end = payload['origin'], payload['destination']
    response = get_route(RouteRequest(startAddress=start, endAddress=end))
    return JSONResponse(content=response, status_code=200)

@app.post("/api/getRoute")
async def get_route(route_request: RouteRequest):
    startAddress = route_request.startAddress
    endAddress = route_request.endAddress
    try:
        start_location = geocode(startAddress)
        end_location = geocode(endAddress)
        
        if not start_location or not end_location:
            raise HTTPException(status_code=404, detail="One or both addresses not found")

        routing_url = (
            f"https://router.hereapi.com/v8/routes?transportMode=car"
            f"&origin={start_location['lat']},{start_location['lng']}"
            f"&destination={end_location['lat']},{end_location['lng']}"
            f"&return=summary&apikey={HERE_API_KEY}"
        )

        route_response = requests.get(routing_url)
        route_response.raise_for_status()
        route_data = route_response.json()

        route_summary = route_data["routes"][0]["sections"][0]["summary"]

        return {
            "distance": route_summary["length"],
            "duration": route_summary["duration"]
        }

    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Failed to calculate route: {str(e)}")

def geocode(address):
    geocode_url = f"https://geocode.search.hereapi.com/v1/geocode?q={requests.utils.quote(address)}&apiKey={HERE_API_KEY}"

    try:
        response = requests.get(geocode_url)
        response.raise_for_status()
        data = response.json()
        
        location = data['items'][0]['position']
        return location

    except (IndexError, KeyError):
        print("Address not found.")
        return None
    except requests.RequestException as e:
        print("Error fetching geocode data:", e)
        return None

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=3001)
