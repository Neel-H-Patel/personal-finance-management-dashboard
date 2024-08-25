import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Goal } from './goal-tracker.model';

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private apiUrl = 'http://localhost:8000/api/goals/'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  getGoals(): Observable<Goal[]> {
    return this.http.get<Goal[]>(this.apiUrl);
  }

  addGoal(goal: Goal): Observable<Goal> {
    return this.http.post<Goal>(this.apiUrl, goal);
  }

  updateGoal(id: number, goal: Goal): Observable<Goal> {
    return this.http.put<Goal>(`${this.apiUrl}${id}/`, goal);
  }

  deleteGoal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
