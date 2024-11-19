// import { HttpClient } from '@angular/common/http';
// import { Component, Input } from '@angular/core';
// import { FormsModule } from '@angular/forms';

import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.less'
})
export class GeneratorComponent {
  // @Input() startAddress: string = '';
  // @Input() endAddress: string = '';
  // routes: any = null;

  // constructor(private http: HttpClient) { }

  // updateOriginAddress(newAddress: string) {
  //   this.startAddress = newAddress;
  // }

  // retrieveRoutes() {
  //   if (!this.startAddress || !this.endAddress) {
  //     alert('Please enter both start and end addresses');
  //     return;
  //   }

  //   const payload = {
  //     startAddress: this.startAddress,
  //     endAddress: this.endAddress
  //   };

  //   this.http.post('http://localhost:3001/api/retrieveRoutes', payload)
  //     .subscribe({
  //       next: (response: any) => {
  //         this.routes = response;
  //         console.log('Routes retrieved:', response);
  //       },
  //       error: (error: any) => {
  //         console.error('Error retrieving routes:', error);
  //         alert('Failed to retrieve routes');
  //       }
  //     });
  // }

  routeForm = new FormGroup({
    origin: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required)
  });

  constructor(private http: HttpClient) { }

  onSubmit() {
    if (this.routeForm.valid) {
      const formData = {
        origin: this.routeForm.value.origin,
        destination: this.routeForm.value.destination
      };

      this.http.post('http://localhost:3001/api/receiveRoutes', formData)
        .subscribe({
          next: (response) => {
            console.log('Routes sent successfully', response);
            this.routeForm.reset();
          },
          error: (error) => {
            console.error('Error sending routes', error);
          }
        });
    }
  }
}


// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-user',
//   template: `
//     <p>Username: {{ username }}</p>
//     <p>{{ username }}'s favorite framework: {{ favoriteFramework }}</p>
//     <label for="framework">
//       Favorite Framework:
//       <input id="framework" type="text" [(ngModel)]="favoriteFramework" />
//     </label>
//   `,
//   standalone: true,
//   imports: [FormsModule],
// })
// export class UserComponent {
//   favoriteFramework = '';
//   username = 'youngTech';
// }
