import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { GeneratorComponent } from './generator/generator.component';

@Component({
  selector: 'app-generation-page',
  standalone: true,
  imports: [NavBarComponent, GeneratorComponent],
  templateUrl: './generation-page.component.html',
  styleUrl: './generation-page.component.less'
})
export class GenerationPageComponent {

}
