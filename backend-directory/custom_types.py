from pydantic import BaseModel

class AgentRequest(BaseModel):
    query: str

class AgentResponse(BaseModel):
    status: str
    response: str | None = None
    error: str | None = None
    metadata: dict

class LocationRequest(BaseModel):
    origin: str
    destination: str
    travelers: int

class RouteResponse(BaseModel):
    car_route: dict
    pedestrian_route: dict
    bicycle_route: dict 