import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouteSectionModel } from '../../../../models/RouteModel';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-route-information-box',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './route-information-box.component.html',
  styleUrl: './route-information-box.component.less'
})
export class RouteInformationBoxComponent {
  @Input() routeType: string = "";
  @Input() routeData: RouteSectionModel = {} as RouteSectionModel;
  @Output() priceCalculated = new EventEmitter<{ type: string, price: number }>();

  calculatedPrice: number = 0.00; //USD
  duration: number = 0; //TOTAL in seconds
  durationObj: { hours: number, minutes: number } = { hours: 0, minutes: 0 };
  distance: number = 0; //TOTAL in meters
  distanceKm: number = 0; //TOTAL in kilometers
  distanceMi: number = 0; //TOTAL in miles

  ngOnInit() {
    this.duration = this.routeData.summary.duration;
    this.durationObj.minutes = Math.floor(this.duration / 60);
    this.durationObj.hours = Math.floor(this.duration / (60 * 60));
    if (this.durationObj.hours > 0) {
      this.durationObj.minutes = this.durationObj.minutes % 60;
    }

    this.distance = this.routeData.summary.length;
    this.distanceKm = this.distance / 1000;
    this.distanceMi = this.distanceKm * .621371

    this.calculatedPrice = this.calculatePrice();
    this.priceCalculated.emit({
      type: this.routeType,
      price: this.calculatedPrice
    });

  };

  calculatePrice() {
    let estimatedPrice = 0.00;

    let carCostPerMeter = 0.00015;
    let bicycleCostPerMeter = 0.00003;
    let pedestrianCostPerMeter = 0.00001;

    let baseRideshareFare = 3.00;
    let rideshareCostPerSecondMax = 0.80 / 60; // cost per minute/60
    let rideshareCostPerSecondMin = 0.40 / 60;
    let rideshareCostPerSecond = Math.random() * (rideshareCostPerSecondMax - rideshareCostPerSecondMin) + rideshareCostPerSecondMin;
    let rideshareCostPerMeterMax = 0.00097;
    let rideshareCostPerMeterMin = 0.00081;
    let rideshareCostPerMeter = Math.random() * (rideshareCostPerMeterMax - rideshareCostPerMeterMin) + rideshareCostPerMeterMin;

    switch (this.routeType) {
      case "car":
        estimatedPrice = this.distance * carCostPerMeter;
        break;
      case "uber":
        estimatedPrice = baseRideshareFare + rideshareCostPerSecond * this.duration + rideshareCostPerMeter * this.distance;
        break;
      case "lyft":
        estimatedPrice = baseRideshareFare + rideshareCostPerSecond * this.duration + rideshareCostPerMeter * this.distance;
        estimatedPrice = estimatedPrice * 0.85; //lyft is usually cheaper than uber
        break;
      case "bicycle":
        estimatedPrice = bicycleCostPerMeter * this.distance;
        break;
      case "pedestrian":
        estimatedPrice = pedestrianCostPerMeter * this.distance;
        break;
    }

    return estimatedPrice;
  }
}
