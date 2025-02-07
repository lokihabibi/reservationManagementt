import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rapport } from '../models/rapport.model';

@Injectable({
  providedIn: 'root'
})
export class RapportService {
  private baseUrl = 'http://localhost:8006/api/rapports';

  constructor(private http: HttpClient) { }

  createRapport(rapport: Rapport): Observable<Rapport> {
    console.log('RapportService: Creating rapport:', rapport);
    return this.http.post<Rapport>(this.baseUrl, rapport);
  }

  getRapportsByUser(userId: number): Observable<Rapport[]> {
    return this.http.get<Rapport[]>(`${this.baseUrl}/user/${userId}`);
  }

  getRapportsByManager(managerId: number): Observable<Rapport[]> {
    return this.http.get<Rapport[]>(`${this.baseUrl}/manager/${managerId}`);
  }
}
