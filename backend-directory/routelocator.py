from pydantic import BaseModel
import requests
from fastapi import FastAPI, HTTPException

app = FastAPI()
HERE_API_KEY = 'Dj8ma2p3D0zH0tBOcdn13L-7y9Z6L0lePzIo3Clw030'

class RouteRequest(BaseModel):
    origin: str
    destination: str

@app.post("/api/retrieveRoutes")
async def post_data(route_request: RouteRequest):
    # Call get_route and return its response directly
    return await get_route(route_request)

@app.post("/api/getRoute")
async def get_route(route_request: RouteRequest):
    startAddress = route_request.origin
    endAddress = route_request.destination
    try:
        start_location = geocode(startAddress)
        end_location = geocode(endAddress)
        
        if not start_location or not end_location:
            raise HTTPException(status_code=404, detail="One or both addresses not found")

        routing_url_car = (
            f"https://router.hereapi.com/v8/routes?transportMode=car"
            f"&origin={start_location['lat']},{start_location['lng']}"
            f"&destination={end_location['lat']},{end_location['lng']}"
            f"&return=summary&apikey={HERE_API_KEY}"
        )

        routing_url_bicycle = (
            f"https://router.hereapi.com/v8/routes?transportMode=bicycle"
            f"&origin={start_location['lat']},{start_location['lng']}"
            f"&destination={end_location['lat']},{end_location['lng']}"
            f"&return=summary&apikey={HERE_API_KEY}"
        )

        routing_url_pedestrian = (
            f"https://router.hereapi.com/v8/routes?transportMode=pedestrian"
            f"&origin={start_location['lat']},{start_location['lng']}"
            f"&destination={end_location['lat']},{end_location['lng']}"
            f"&return=summary&apikey={HERE_API_KEY}"
        )

        routing_url_taxi = (
            f"https://router.hereapi.com/v8/routes?transportMode=taxi"
            f"&origin={start_location['lat']},{start_location['lng']}"
            f"&destination={end_location['lat']},{end_location['lng']}"
            f"&return=summary&apikey={HERE_API_KEY}"
        )

        # Send requests for each transport mode
        route_response_car = requests.get(routing_url_car)
        route_response_car.raise_for_status()
        
        route_response_bicycle = requests.get(routing_url_bicycle)
        route_response_bicycle.raise_for_status()

        route_response_pedestrian = requests.get(routing_url_pedestrian)
        route_response_pedestrian.raise_for_status()

        route_response_taxi = requests.get(routing_url_taxi)
        route_response_taxi.raise_for_status()

        # Extract JSON data from each response
        route_data_car = route_response_car.json()
        route_data_bicycle = route_response_bicycle.json()
        route_data_pedestrian = route_response_pedestrian.json()
        route_data_taxi = route_response_taxi.json()

        # Construct the route summary
        route_summary = {
            "car": route_data_car["routes"][0]["sections"][0]["summary"],
            "bicycle": route_data_bicycle["routes"][0]["sections"][0]["summary"],
            "pedestrian": route_data_pedestrian["routes"][0]["sections"][0]["summary"],
            "taxi": route_data_taxi["routes"][0]["sections"][0]["summary"],
        }

        return route_summary  # Return JSON-serializable dictionary directly
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
