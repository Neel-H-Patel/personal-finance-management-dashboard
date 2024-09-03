import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}auth/`;
  private currentUser = signal<any>(null);

  constructor(private http: HttpClient, private router: Router) {}

  getCurrentUser(): any {
    return this.currentUser();
  }

  login(username: string, password: string) {
    const csrfToken = this.getCookie('csrftoken') || '';
    const headers = new HttpHeaders({
        'X-CSRFToken': csrfToken,
        'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}login/`, { username, password }, { headers, withCredentials: true })
      .pipe(map(user => {
        if (user && user.username) {
          this.currentUser.set(user);
          // Optionally, store user details and token in local storage or state management
        }
        return user;
      }));
  }

  register(username: string, password: string, email: string) {
    const csrfToken = this.getCookie('csrftoken') || '';
    const headers = new HttpHeaders({
        'X-CSRFToken': csrfToken,
        'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}register/`, { username, password, email }, { headers, withCredentials: true })
      .pipe(map(user => {
        if (user && user.username) {
          this.currentUser.set(user);
          // Optionally, store user details and token in local storage or state management
        }
        return user;
      }));
  }

  logout() {
    const csrfToken = this.getCookie('csrftoken') || '';
    const headers = new HttpHeaders({
        'X-CSRFToken': csrfToken,
        'Content-Type': 'application/json'
    });

    this.http.post<any>(`${this.apiUrl}logout/`, {}, { headers, withCredentials: true })
      .subscribe(() => {
        this.currentUser.set(null);
        this.router.navigate(['/login']);
        // Optionally, remove user details from local storage or state management
      });
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
}