import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Budget } from './budget-planner.model';

@Injectable({
providedIn: 'root'
})
export class BudgetService {
  private apiUrl = 'http://localhost:8000/api/budgets/'; // Replace with your backend API URL

constructor(private http: HttpClient) { }

getBudgets(): Observable<Budget[]> {
    return this.http.get<Budget[]>(this.apiUrl);
}

addBudget(budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(this.apiUrl, budget);
}

updateBudget(id: number, budget: Budget): Observable<Budget> {
    return this.http.put<Budget>(`${this.apiUrl}${id}/`, budget);
}

deleteBudget(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
}
}
