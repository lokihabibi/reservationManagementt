import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReservationService } from '../../services/reservation.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class ReservationFormComponent implements OnInit, OnDestroy {
  reservationForm: FormGroup;
  isLoading = false;
  today = new Date().toISOString().split('T')[0];
  errorMessage = '';
  clientId: number | null = null;
  private authSubscription: Subscription | null = null;

  timeSlots = [
    '08:00-09:00',
    '09:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '12:00-13:00',
    '13:00-14:00',
    '14:00-15:00',
    '15:00-16:00',
    '16:00-17:00'
  ];

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<ReservationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.reservationForm = this.fb.group({
      date: ['', Validators.required],
      timeSlot: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.user.subscribe(user => {
      if (user && user.idUser) {
        this.clientId = Number(user.idUser);
      } else {
        this.errorMessage = 'Please log in to make a reservation';
        this.clientId = null;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    if (!this.clientId) {
      this.errorMessage = 'Please log in to make a reservation';
      return;
    }

    if (!this.data.managerId) {
      this.errorMessage = 'Manager ID is required';
      return;
    }

    this.isLoading = true;
    const formValue = this.reservationForm.value;
    
    const reservation = {
      userId: this.clientId,
      dateRes: formValue.date,
      timeSlot: formValue.timeSlot,
      terrainId: this.data.terrainId || null,
      equipmentId: this.data.equipmentId || null,
      managerId: this.data.managerId,
      status: 'pending'
    };

    console.log('Sending reservation request:', reservation);

    this.reservationService.createReservation(reservation).subscribe({
      next: (response) => {
        console.log('Reservation created successfully:', response);
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Reservation error:', error);
        this.errorMessage = error.message || 'Failed to create reservation. Please try again.';
        this.isLoading = false;
      }
    });
  }
}