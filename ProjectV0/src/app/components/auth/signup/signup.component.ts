import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.signupForm = this.fb.group({
      prenomUser: ['', [Validators.required, Validators.minLength(2)]],
      nomUser: ['', [Validators.required, Validators.minLength(2)]],
      emailUser: ['', [Validators.required, Validators.email]],
      adresseUser: ['', [Validators.required, Validators.minLength(5)]],
      telUser: ['', [Validators.required, Validators.pattern('^[0-9]{8,}$')]],
      passwordUser: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      const userData: User = {
        prenomUser: this.signupForm.value.prenomUser,
        nomUser: this.signupForm.value.nomUser,
        emailUser: this.signupForm.value.emailUser,
        adresseUser: this.signupForm.value.adresseUser,
        telUser: this.signupForm.value.telUser,
        passwordUser: this.signupForm.value.passwordUser,
        role: 'client'
      };

      this.userService.createUser(userData).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.signupForm.get(controlName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return 'This field is required';
      }
      if (control.errors['email']) {
        return 'Please enter a valid email';
      }
      if (control.errors['minlength']) {
        const requiredLength = control.errors['minlength'].requiredLength;
        return `Minimum length is ${requiredLength} characters`;
      }
      if (control.errors['pattern']) {
        return 'Please enter a valid phone number';
      }
    }
    return '';
  }
}