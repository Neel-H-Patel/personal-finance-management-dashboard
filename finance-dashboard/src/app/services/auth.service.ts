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
    // No need to set CSRF token here, interceptor handles it
    return this.http.post<any>(`${this.apiUrl}login/`, { username, password }, { withCredentials: true })
      .pipe(map(user => {
        if (user && user.username) {
          this.currentUser.set(user);
        }
        return user;
      }));
  }

  register(username: string, password: string, email: string) {
    // No need to set CSRF token here, interceptor handles it
    return this.http.post<any>(`${this.apiUrl}register/`, { username, password, email }, { withCredentials: true })
      .pipe(map(user => {
        if (user && user.username) {
          this.currentUser.set(user);
        }
        return user;
      }));
  }

  logout() {
    // No need to set CSRF token here, interceptor handles it
    this.http.post<any>(`${this.apiUrl}logout/`, {}, { withCredentials: true })
      .subscribe(() => {
        this.currentUser.set(null);
        this.router.navigate(['/login']);
      });
  }
}
