export interface RetrieveRoutesResponseModel {
  car_route: {
    routes: RouteModel[]
  },
  pedestrian_route: {
    routes: RouteModel[]
  },
  bicycle_route: {
    routes: RouteModel[]
  },

}

interface RouteModel {
  id: string,
  sections: RouteSectionModel[],
}

interface RouteSectionModel {
  arrival: {
    time: string,
    place: any,
  },
  departure: {
    time: string,
    place: any,
  },
  id: string,
  polyline: string,
  summary: {
    duration: number,
    length: number,
    baseDuration: number,
  },
  transport: {
    mode: string,
  },
  type: string
}