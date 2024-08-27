import { Component, Signal, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [RouterModule, FormsModule, CommonModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    username: Signal<string> = signal('');
    password: Signal<string> = signal('');

    constructor(private router: Router) {}

    onRegister() {
        const usernameValue = this.username();
        const passwordValue = this.password();
        // TODO: Implement registration logic, e.g., call a service that interacts with the backend.
        if (usernameValue && passwordValue) {
            console.log(`Registering with username: ${usernameValue} and password: ${passwordValue}`);
            // Temporary redirect for demonstration
            // Replace with actual registration logic
            this.router.navigate(['/login']);
        } else {
            alert('Please enter a username and password.');
        }
    }
}