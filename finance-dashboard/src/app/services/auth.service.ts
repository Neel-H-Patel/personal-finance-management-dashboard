import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

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
    return this.http.post<any>(`${this.apiUrl}login/`, { username, password })
      .pipe(map(user => {
        if (user && user.access) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUser.set(user);
        }
        return user;
      }));
  }

  register(username: string, password: string, email: string) {
    return this.http.post<any>(`${this.apiUrl}register/`, { username, password, email });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}