from pydantic import BaseModel
from typing import Dict, Optional

class AgentRequest(BaseModel):
    query: str

class AgentResponse(BaseModel):
    status: str
    response: Optional[str] = None
    error: Optional[str] = None
    metadata: Dict

class LocationRequest(BaseModel):
    origin: str
    destination: str
    travelers: int

class RouteResponse(BaseModel):
    car_route: Dict
    pedestrian_route: Dict
    bicycle_route: Dict 