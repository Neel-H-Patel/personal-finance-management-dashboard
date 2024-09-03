import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { CsrfService } from './services/csrf.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'finance-dashboard';

  constructor( private csrfService: CsrfService) {}

  ngOnInit() {
    // Initialize CSRF token when the app loads
    this.csrfService.initCsrfToken();
  }
}
