import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  user: any = null;
  editedUser: any = {
    prenomUser: '',
    nomUser: '',
    emailUser: '',
    telUser: '',
    adresseUser: ''
  };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const currentUser = this.authService.userValue;
    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.user = currentUser;
    console.log('Current user data:', currentUser); // Debug log

    // Initialize edited user data only once
    this.editedUser = {
      prenomUser: currentUser.prenomUser || '',
      nomUser: currentUser.nomUser || '',
      emailUser: currentUser.emailUser || '',
      telUser: currentUser.telUser || '', // Make sure this matches your database field
      adresseUser: currentUser.adresseUser || '',
      idUser: currentUser.idUser,
      role: currentUser.role,
      passwordUser: currentUser.passwordUser
    };

    // Only update the user reference, not the edited values
    this.authService.user.subscribe(
      (userData) => {
        if (userData) {
          this.user = userData;
        }
      },
      (error) => {
        console.error('Error getting user data:', error);
        this.errorMessage = 'Error loading user data';
      }
    );
  }

  get userRole(): string {
    return this.user?.role || 'Not available';
  }

  saveSettings(): void {
    if (!this.user) {
      this.errorMessage = 'Please log in to save settings';
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.editedUser.emailUser)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    // Validate required fields
    if (!this.editedUser.prenomUser || !this.editedUser.nomUser) {
      this.errorMessage = 'First name and last name are required';
      return;
    }

    console.log('Saving user settings:', this.editedUser); // Debug log

    this.authService.updateUserSettings(this.editedUser).subscribe(
      (response) => {
        console.log('Update response:', response); // Debug log
        this.successMessage = 'User information updated successfully';
        this.user = response;
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      (error) => {
        console.error('Error saving user information:', error);
        this.errorMessage = 'Failed to update user information. Please try again.';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    );
  }
}
