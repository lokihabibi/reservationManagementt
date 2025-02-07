import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css'],
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
export class UserDialogComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User | null }
  ) {
    this.userForm = this.fb.group({
      prenomUser: [data.user?.prenomUser || '', Validators.required],
      nomUser: [data.user?.nomUser || '', Validators.required],
      emailUser: [data.user?.emailUser || '', [Validators.required, Validators.email]],
      passwordUser: [data.user?.passwordUser || '', Validators.required],
      telUser: [data.user?.telUser || '', [Validators.required, Validators.pattern(/^\+?[0-9\s-]{8,}$/)]],
      adresseUser: [data.user?.adresseUser || '', Validators.required],
      role: [data.user?.role || 'client', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = {
        ...this.userForm.value,
        idUser: this.data.user?.idUser
      };
      this.dialogRef.close(userData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
