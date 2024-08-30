import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ExpenseTrackerService {
  private apiUrl = `${environment.apiUrl}expenses/`;

  constructor(private http: HttpClient) {}

  getExpenses(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addExpense(expense: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, expense);
  }

  updateExpense(id: number, expense: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, expense);
  }

  deleteExpense(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }
}