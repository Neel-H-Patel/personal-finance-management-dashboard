// goal-tracker.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GoalTrackerService {
  private apiUrl = `${environment.apiUrl}goals/`;

  constructor(private http: HttpClient) {}

  getGoals(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { withCredentials: true });
  }

  addGoal(goal: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, goal, { withCredentials: true });
  }

  updateGoal(id: number, goal: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, goal, { withCredentials: true });
  }

  deleteGoal(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`, { withCredentials: true });
  }
}