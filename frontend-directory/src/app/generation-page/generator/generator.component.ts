import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RetrieveRoutesResponseModel, RouteSectionModel } from '../../../models/RouteModel';
import { RouteInformationBoxComponent } from './route-information-box/route-information-box.component';
import { MatIconModule } from '@angular/material/icon';

interface GeneratedRoute {
  type: string,
  data: RouteSectionModel
}

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [ReactiveFormsModule, RouteInformationBoxComponent, MatIconModule],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.less'
})
export class GeneratorComponent {
  routeForm = new FormGroup({
    origin: new FormControl('', Validators.required),
    travelers: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required)
  });

  errorSubmittingForm: boolean = false;
  loadingRoutes: boolean = false;
  routesLoaded: boolean = false;

  generatedRoutes: GeneratedRoute[] = [];
  routePrices: Map<string, number> = new Map();

  constructor(private http: HttpClient) { }

  onSubmit() {
    if (this.routeForm.valid) {
      const formData = {
        origin: this.routeForm.value.origin,
        travelers: this.routeForm.value.travelers,
        destination: this.routeForm.value.destination
      };

      this.routesLoaded = false;
      this.errorSubmittingForm = false;
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
        },
        error: (error) => {
          this.loadingRoutes = false;
          console.error('Error sending routes', error);
        }
      });
    } else {
      this.errorSubmittingForm = true;
      setTimeout(() => { this.errorSubmittingForm = false }, 4000); //display an error message for 4 seconds
    }
  }

  onPriceCalculated(priceData: { type: string, price: number }) {
    this.routePrices.set(priceData.type, priceData.price);
  }

  private parseRetrieveRoutesResponse(response: RetrieveRoutesResponseModel) {
    this.generatedRoutes = [
      {
        type: "car",
        data: response.car_route.routes[0].sections[0]
      },
      {
        type: "uber",
        data: response.car_route.routes[0].sections[0]
      },
      {
        type: "lyft",
        data: response.car_route.routes[0].sections[0]
      },
      {
        type: "bicycle",
        data: response.bicycle_route.routes[0].sections[0]
      },
      {
        type: "pedestrian",
        data: response.pedestrian_route.routes[0].sections[0]
      },

    ]
    return;
  }
}
