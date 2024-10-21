import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-route-generator',
  standalone: true,
  imports: [NavBarComponent, RouterLink],
  templateUrl: './route-generator.component.html',
  styleUrl: './route-generator.component.less'
})
export class RouteGeneratorComponent {

}
