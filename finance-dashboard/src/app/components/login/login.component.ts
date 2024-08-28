import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, CommonModule, RouterModule]
})
export class LoginComponent {
  username = signal<string>('');
  password = signal<string>('');
  errorMessage = signal<string>('');

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username(), this.password()).subscribe(
      () => this.router.navigate(['/budget-planner']),
      () => this.errorMessage.set('Invalid login credentials')
    );
  }
}