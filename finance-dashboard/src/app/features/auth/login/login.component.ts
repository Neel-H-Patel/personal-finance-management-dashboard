import { Component, Signal, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterModule, FormsModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    username: Signal<string> = signal('');
    password: Signal<string> = signal('');

    constructor(private router: Router) {}

    onLogin() {
        const usernameValue = this.username();
        const passwordValue = this.password();
        // TODO: Implement login logic, e.g., call a service that interacts with the backend.
        if (usernameValue && passwordValue) {
            console.log(`Logging in with username: ${usernameValue} and password: ${passwordValue}`);
            // Temporary redirect for demonstration
            // Replace with actual login logic
            this.router.navigate(['/dashboard']);
        } else {
            alert('Please enter a username and password.');
        }
    }
}