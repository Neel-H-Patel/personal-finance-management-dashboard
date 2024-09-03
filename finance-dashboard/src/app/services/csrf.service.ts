// csrf.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CsrfService {
  private csrfUrl = `${environment.apiUrl}set-csrf-token/`;

  constructor(private http: HttpClient) {}

  initCsrfToken() {
    // This call sets the CSRF token cookie on the frontend
    return this.http.get(this.csrfUrl, { withCredentials: true }).subscribe(
      (response) => {
        console.log('CSRF token set:', response);
      },
      (error) => {
        console.error('CSRF token setup failed:', error);
      }
    );
  }
}