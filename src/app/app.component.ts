import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Good to include for general directives if needed in app.component.html
import { RouterModule } from '@angular/router'; // PROVIDES routerLink AND router-outlet

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, // Provides *ngIf, *ngFor (if you use them in app.component.html)
    RouterModule  // Provides routerLink and router-outlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lams-frontend';
} 