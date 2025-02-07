import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {
  constructor(private authService: AuthService) {}

  get userName(): string {
    const user = this.authService.userValue;
    return user ? `${user.prenomUser} ${user.nomUser}` : 'User';
  }

  logout(): void {
    this.authService.logout();
  }
}
