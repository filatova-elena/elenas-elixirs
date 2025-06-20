import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'elena-cocktail-generator';
  
  // This component serves as the main entry point for the application.
  // It includes the header and sets up the router outlet for navigation.
  
  // No additional logic is needed here as all functionality is handled in child components and services.
  // The header component is imported and used to display the application title and navigation.
  // The RouterOutlet directive is used to display the routed components based on the current URL.
}