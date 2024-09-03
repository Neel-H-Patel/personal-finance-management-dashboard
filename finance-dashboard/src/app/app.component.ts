import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { CsrfService } from './services/csrf.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'finance-dashboard';

  constructor(private authService: AuthService, private csrfService: CsrfService) {}

  ngOnInit() {
    // Initialize CSRF token when the app loads
    this.csrfService.initCsrfToken();
  }

  isLoggedIn(): boolean {
    return !!this.authService.getCurrentUser(); // Return true if a user is logged in, false otherwise
  }
}
