
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
    return this.http.get<any>(this.apiUrl);
  }

  addGoal(goal: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, goal);
  }

  updateGoal(id: number, goal: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, goal);
  }

  deleteGoal(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }
}