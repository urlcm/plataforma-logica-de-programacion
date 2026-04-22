// csharp-execution.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CSharpExecutionService {
  
  private apiUrl = 'http://localhost:8081/api/csharp';

  constructor(private http: HttpClient) { }

  executeCode(code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/execute`, { code });
  }

  healthCheck(): Observable<any> {
    return this.http.get(`${this.apiUrl}/health`);
  }
}