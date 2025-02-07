import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Terrain } from '../models/terrain.model';

@Injectable({
  providedIn: 'root'
})
export class TerrainService {
  private apiUrl = 'http://localhost:8006/api/terrains'; // Backend URL

  constructor(private http: HttpClient) { }

  getAllTerrains(): Observable<Terrain[]> {
    return this.http.get<Terrain[]>(`${this.apiUrl}`);
  }

  getTerrainById(id: number): Observable<Terrain> {
    return this.http.get<Terrain>(`${this.apiUrl}/${id}`);
  }

  createTerrain(terrain: Terrain): Observable<Terrain> {
    return this.http.post<Terrain>(`${this.apiUrl}`, terrain);
  }

  updateTerrain(id: number, terrain: Terrain): Observable<Terrain> {
    return this.http.put<Terrain>(`${this.apiUrl}/${id}`, terrain);
  }

  deleteTerrain(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
