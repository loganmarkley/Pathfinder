// import { HttpClient } from '@angular/common/http';
// import { Component, Input } from '@angular/core';
// import { FormsModule } from '@angular/forms';

import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RetrieveRoutesResponseModel } from '../../../models/RouteModel';
import { RouteInformationBoxComponent } from './route-information-box/route-information-box.component';


@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [ReactiveFormsModule, RouteInformationBoxComponent],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.less'
})
export class GeneratorComponent {
  routeForm = new FormGroup({
    origin: new FormControl('', Validators.required),
    travelers: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required)
  });

  carRoute: any = {};
  pedestrianRoute: any = {};
  bicycleRoute: any = {};

  loadingRoutes: boolean = false;
  routesLoaded: boolean = false;

  constructor(private http: HttpClient) { }

  onSubmit() {
    if (this.routeForm.valid) {
      const formData = {
        origin: this.routeForm.value.origin,
        travelers: this.routeForm.value.travelers,
        destination: this.routeForm.value.destination
      };

      this.loadingRoutes = true;

      this.http.post<RetrieveRoutesResponseModel>('http://localhost:3001/api/retrieveRoutes', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).subscribe({
        next: (response) => {
          console.log('Routes sent successfully', response);
          this.parseRetrieveRoutesResponse(response);
          this.loadingRoutes = false;
          this.routesLoaded = true;
          // this.routeForm.reset();
        },
        error: (error) => {
          this.loadingRoutes = false;
          console.error('Error sending routes', error);
        }
      });
    } else { }
  }

  private parseRetrieveRoutesResponse(response: RetrieveRoutesResponseModel) {
    this.carRoute = response.car_route.routes[0].sections[0];
    this.carRoute = response.car_route.routes[0].sections[0].type;
    this.bicycleRoute = response.bicycle_route.routes[0].sections[0];
    this.pedestrianRoute = response.pedestrian_route.routes[0].sections[0];
    return;
  }
}
