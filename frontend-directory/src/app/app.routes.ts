import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RouteGeneratorComponent } from './route-generator/route-generator.component';
import { AboutUsComponent } from './about-us/about-us.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'generator', component: RouteGeneratorComponent },
  { path: 'about-us', component: AboutUsComponent}
];
