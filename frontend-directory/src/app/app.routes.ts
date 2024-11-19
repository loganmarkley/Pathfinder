import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GenerationPageComponent } from './generation-page/generation-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'generator', component: GenerationPageComponent },
];
