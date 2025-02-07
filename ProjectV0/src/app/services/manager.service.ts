import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private baseUrl = 'http://localhost:8006/api';

  constructor(private http: HttpClient) {}

  // Terrain Management
  getManagedTerrains(managerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/terrains/manager/${managerId}`).pipe(
      catchError(this.handleError)
    );
  }

  updateTerrainAvailability(terrainId: number, availability: string): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/terrains/${terrainId}/availability?availability=${availability}`, 
      {}
    ).pipe(
      catchError(this.handleError)
    );
  }

  // Equipment Management
  getManagedEquipments(managerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/equipment/manager/${managerId}`).pipe(
      catchError(this.handleError)
    );
  }

  updateEquipmentAvailability(equipmentId: number, availability: string): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/equipment/${equipmentId}/availability?availability=${availability}`, 
      {}
    ).pipe(
      catchError(this.handleError)
    );
  }

  // Reservation Management
  getPendingReservations(managerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/reservations/manager/${managerId}/pending`).pipe(
      catchError(this.handleError)
    );
  }

  handleReservation(reservationId: number, status: string): Observable<any> {
    console.log(`Handling reservation ${reservationId} with status ${status}`);
    const url = `${this.baseUrl}/reservations/${reservationId}/status`;
    return this.http.put(url, null, { params: { status } }).pipe(
      catchError(error => {
        console.error('Error handling reservation:', error);
        const errorMessage = error.error?.message || 'Failed to update reservation status';
        return throwError(() => new Error(`Error Code: ${error.status}\nMessage: ${errorMessage}`));
      })
    );
  }

  // Rapport Management
  getManagerRapports(managerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/rapports/manager/${managerId}`).pipe(
      map(rapports => {
        // Transform the response to include user names if available
        return rapports.map(rapport => ({
          ...rapport,
          terrainName: rapport.terrainName || 'N/A',
          equipmentName: rapport.equipmentName || 'N/A',
          userName: rapport.userName || rapport.id_user
        }));
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
