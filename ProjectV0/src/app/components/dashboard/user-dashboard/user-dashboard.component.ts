import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyReservationsComponent } from '../../my-reservations/my-reservations.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, MyReservationsComponent]
})
export class UserDashboardComponent {}
