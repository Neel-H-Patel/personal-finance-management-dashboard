import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BudgetPlannerService {
  private apiUrl = `${environment.apiUrl}budgets/`;

  constructor(private http: HttpClient) {}

  getBudgets(): Observable<any> {
    // No need to set CSRF token here, interceptor handles it
    return this.http.get<any>(this.apiUrl, { withCredentials: true });
  }

  addBudget(budget: any): Observable<any> {
    // No need to set CSRF token here, interceptor handles it
    return this.http.post<any>(this.apiUrl, budget, { withCredentials: true });
  }

  updateBudget(id: number, budget: any): Observable<any> {
    // No need to set CSRF token here, interceptor handles it
    return this.http.put<any>(`${this.apiUrl}${id}/`, budget, { withCredentials: true });
  }

  deleteBudget(id: number): Observable<any> {
    // No need to set CSRF token here, interceptor handles it
    return this.http.delete<any>(`${this.apiUrl}${id}/`, { withCredentials: true });
  }
}