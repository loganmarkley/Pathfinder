import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-route-information-box',
  standalone: true,
  imports: [],
  templateUrl: './route-information-box.component.html',
  styleUrl: './route-information-box.component.less'
})
export class RouteInformationBoxComponent {
  @Input() test: string = "not updated";
}
