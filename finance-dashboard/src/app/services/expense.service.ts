import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
providedIn: 'root'
})
export class ExpenseService {
private apiUrl = `${environment.apiUrl}/expenses/`;

constructor(private http: HttpClient) { }

getExpenses(): Observable<any> {
    return this.http.get(this.apiUrl);
}

  // Add other methods for POST, PUT, DELETE, etc.
}
