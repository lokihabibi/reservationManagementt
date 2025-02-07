import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../services/reservation.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {
  reservations: any[] = [];

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    const user = this.authService.userValue;
    console.log('Current user:', user);
    
    // Check if we have a valid client ID
    const clientId = user?.idUser || user?.clientId; // Ensure correct property is referenced
    console.log('Client ID to use:', clientId, typeof clientId);
    
    if (clientId) {
      this.reservationService.getClientReservations(clientId).subscribe({
        next: (data) => {
          console.log('Loaded reservations:', data);
          if (Array.isArray(data)) {
            this.reservations = data;
          } else {
            console.error('Unexpected response format:', data);
            this.reservations = [];
          }
        },
        error: (error) => {
          console.error('Error loading reservations:', error);
          this.reservations = [];
          alert('Failed to load reservations: ' + (error.message || 'Unknown error'));
        }
      });
    } else {
      console.error('No client ID found in user data:', user);
      this.reservations = [];
      alert('Client ID is required to load reservations.');
    }
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase()}`;
  }

  cancelReservation(reservationId: number): void {
    if (confirm('Are you sure you want to cancel this reservation?')) {
      console.log('Cancelling reservation:', reservationId);
      this.reservationService.cancelReservation(reservationId).subscribe({
        next: () => {
          console.log('Reservation cancelled successfully');
          alert('Reservation cancelled successfully');
          this.loadReservations(); // Reload the list
        },
        error: (error) => {
          console.error('Error cancelling reservation:', error);
          alert('Failed to cancel reservation: ' + (error.message || 'Unknown error'));
        }
      });
    }
  }
}