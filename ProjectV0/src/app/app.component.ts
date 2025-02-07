import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    DashboardLayoutComponent
  ],
  template: `
    <div class="mat-typography mat-app-background">
      <!-- Public Layout -->
      <ng-container *ngIf="!isInDashboard">
        <app-header></app-header>
        <router-outlet></router-outlet>
        <app-footer></app-footer>
      </ng-container>

      <!-- Dashboard Layout (only for logged-in users in dashboard routes) -->
      <ng-container *ngIf="isInDashboard">
        <app-dashboard-layout>
          <router-outlet></router-outlet>
        </app-dashboard-layout>
      </ng-container>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
    .mat-typography {
      min-height: 100vh;
    }
  `]
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  get isInDashboard(): boolean {
    if (!this.authService.isLoggedIn()) return false;
    
    const currentPath = window.location.pathname;
    return currentPath.includes('dashboard') || 
           currentPath.includes('terrain') || 
           currentPath.includes('equipment') ||
           currentPath.includes('settings');
  }
}
