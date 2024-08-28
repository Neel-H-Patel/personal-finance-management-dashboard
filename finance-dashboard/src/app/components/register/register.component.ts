import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [FormsModule, CommonModule]
})
export class RegisterComponent {
  username = signal<string>('');
  password = signal<string>('');
  email = signal<string>('');
  errorMessage = signal<string>('');

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.username(), this.password(), this.email()).subscribe(
      () => this.router.navigate(['/login']),
      () => this.errorMessage.set('Registration failed')
    );
  }
}