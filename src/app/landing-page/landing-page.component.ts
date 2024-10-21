import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NavBarComponent, MatCardModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.less'
})
export class LandingPageComponent {

}
