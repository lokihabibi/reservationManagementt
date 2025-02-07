import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { TerrainSectionComponent } from './components/terrain-section/terrain-section.component';
import { LoginComponent } from './components/auth/login/login.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard/admin-dashboard.component';
import { ManagerDashboardComponent } from './components/dashboard/manager-dashboard/manager-dashboard.component';
import { UserDashboardComponent } from './components/dashboard/user-dashboard/user-dashboard.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { AuthGuard } from './guards/auth.guard';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MyReservationsComponent } from './components/my-reservations/my-reservations.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

// Role guard function
const roleGuard = (allowedRole: string) => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isLoggedIn() && authService.getRole() === allowedRole) {
      return true;
    }

    if (authService.isLoggedIn()) {
      router.navigate([authService.getDashboardUrl()]);
    } else {
      router.navigate(['/login']);
    }
    return false;
  };
};

export const routes: Routes = [
  // Public routes - accessible to everyone
  {
    path: '',
    component: HeroComponent
  },
  {
    path: 'how-it-works',
    component: HowItWorksComponent
  },
  {
    path: 'terrain',
    component: TerrainSectionComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },

  // Protected routes - require authentication
  {
    path: 'equipment',
    component: EquipmentComponent
  },
  {
    path: 'settings',
    component: UserSettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my-reservations',
    component: MyReservationsComponent,
    canActivate: [AuthGuard]
  },

  // Role-specific dashboard routes
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, () => roleGuard('admin')()]
  },
  {
    path: 'manager-dashboard',
    component: ManagerDashboardComponent,
    canActivate: [AuthGuard, () => roleGuard('manager')()]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard, () => roleGuard('client')()],
    children: [
      {
        path: 'reservations',
        component: MyReservationsComponent
      },
      {
        path: 'terrain',
        component: TerrainSectionComponent
      }
    ]
  },

  // Redirect all other routes to home
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
