import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8006/api/reservations';

  constructor(private http: HttpClient) { }

  createReservation(reservation: any): Observable<any> {
    if (!reservation.userId) {
      console.error('No user ID provided:', reservation);
      return throwError(() => new Error('User ID is required'));
    }

    // Format the reservation data to match database schema
    const formattedReservation = {
      userId: Number(reservation.userId),
      dateRes: new Date(reservation.dateRes).toISOString().split('T')[0],
      timeSlot: reservation.timeSlot,
      terrainId: reservation.terrainId ? Number(reservation.terrainId) : null,
      equipmentId: reservation.equipmentId ? Number(reservation.equipmentId) : null,
      managerId: Number(reservation.managerId),
      status: 'pending'
    };

    console.log('Sending reservation request:', formattedReservation);
    
    // Add headers to ensure proper content type
    const headers = { 'Content-Type': 'application/json' };
    
    return this.http.post(this.apiUrl, formattedReservation, { headers }).pipe(
      tap(response => console.log('Reservation created successfully:', response)),
      catchError((error: HttpErrorResponse) => {
        console.error('Reservation error:', error);
        
        // Log detailed error information
        if (error.error?.message) {
          console.error('Detailed error:', error.error.message);
        }
        if (error.error?.error) {
          console.error('Error details:', error.error.error);
        }
        if (error.status === 500) {
          console.error('Server error:', error.error);
        }
        
        return throwError(() => ({
          message: error.error?.message || error.error?.error || 'Failed to create reservation',
          details: error.error
        }));
      })
    );
  }

  getClientReservations(clientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/client/${clientId}`).pipe(
      tap(reservations => console.log('Client reservations loaded:', reservations)),
      catchError(this.handleError)
    );
  }

  cancelReservation(reservationId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${reservationId}/cancel`).pipe(
      tap(response => console.log('Reservation cancelled:', response)),
      catchError(this.handleError)
    );
  }

  checkAvailability(date: string, timeSlot: string): Observable<any> {
    const params = { date, timeSlot };
    console.log('Checking availability:', params);
    return this.http.get(`${this.apiUrl}/check-availability`, { params }).pipe(
      tap(response => console.log('Availability response:', response)),
      catchError((error: HttpErrorResponse) => {
        console.error('Availability check error:', error);
        return throwError(() => error);
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.error?.message || 'An error occurred'));
  }
}