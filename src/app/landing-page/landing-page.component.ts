import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.less'
})
export class LandingPageComponent {

}
