import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface AgentResponse {
  status: string;
  response?: string;
  error?: string;
  metadata: Record<string, any>;
}

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private apiUrl = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {}

  interactWithAgent(message: string): Observable<AgentResponse> {
    return this.http.post<AgentResponse>(`${this.apiUrl}/agent`, { query: message })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
} 