import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GenerationPageComponent } from './generation-page/generation-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'generator', component: GenerationPageComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'chat', component: ChatComponent }
];
