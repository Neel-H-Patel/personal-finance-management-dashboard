import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}auth/`;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}login/`, { username, password }, { withCredentials: true })
      .pipe(map(user => {
        if (user && user.username) {
          this.currentUserSubject.next(user); // Update currentUser
        }
        return user;
      }));
  }

  register(username: string, password: string, email: string) {
    return this.http.post<any>(`${this.apiUrl}register/`, { username, password, email }, { withCredentials: true })
      .pipe(map(user => {
        if (user && user.username) {
          this.currentUserSubject.next(user); // Update currentUser
        }
        return user;
      }));
  }

  logout() {
    this.http.post<any>(`${this.apiUrl}logout/`, {}, { withCredentials: true })
      .subscribe(() => {
        this.currentUserSubject.next(null); // Clear currentUser
        this.router.navigate(['/login']);
      });
  }
}

