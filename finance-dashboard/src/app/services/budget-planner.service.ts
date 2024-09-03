import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BudgetPlannerService {
  private apiUrl = `${environment.apiUrl}budgets/`;

  constructor(private http: HttpClient) {}

  getBudgets(): Observable<any> {
    const csrfToken = this.getCookie('csrftoken') || '';
    const headers = new HttpHeaders({
      'X-CSRFToken': csrfToken
    });

    return this.http.get<any>(this.apiUrl, { headers, withCredentials: true });
  }

  addBudget(budget: any): Observable<any> {
    const csrfToken = this.getCookie('csrftoken') || '';
    const headers = new HttpHeaders({
      'X-CSRFToken': csrfToken,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, budget, { headers, withCredentials: true });
  }

  updateBudget(id: number, budget: any): Observable<any> {
    const csrfToken = this.getCookie('csrftoken') || '';
    const headers = new HttpHeaders({
      'X-CSRFToken': csrfToken,
      'Content-Type': 'application/json'
    });

    return this.http.put<any>(`${this.apiUrl}${id}/`, budget, { headers, withCredentials: true });
  }

  deleteBudget(id: number): Observable<any> {
    const csrfToken = this.getCookie('csrftoken') || '';
    const headers = new HttpHeaders({
      'X-CSRFToken': csrfToken
    });

    return this.http.delete<any>(`${this.apiUrl}${id}/`, { headers, withCredentials: true });
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