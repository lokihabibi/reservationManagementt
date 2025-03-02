import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Equipment } from '../../models/equipment.model';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-equipment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './equipement-dialog.component.html',
  styleUrls: ['./equipement-dialog.component.css']
})
export class EquipmentDialogComponent {
  equipmentForm: FormGroup;
  managers: User[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<EquipmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { equipment: Equipment | null }
  ) {
    this.equipmentForm = this.fb.group({
      nom_equipment: [data.equipment?.nom_equipment || '', Validators.required],
      desc_equipment: [data.equipment?.desc_equipment || '', Validators.required],
      prix: [data.equipment?.prix || '', [Validators.required, Validators.min(0)]],
      image_equip: [data.equipment?.image_equip || ''],
      availability: [data.equipment?.availability || 'available', Validators.required],
      managerId: [data.equipment?.managerId || '', Validators.required],
      location: [data.equipment?.location || '', Validators.required]
    });

    this.loadManagers();
  }

  loadManagers() {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.managers = users.filter(user => user.role === 'manager');
      },
      error: (error) => {
        console.error('Error loading managers:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.equipmentForm.valid) {
      const equipmentData = {
        nom_equipment: this.equipmentForm.value.nom_equipment.trim(), // Trim whitespace
        desc_equipment: this.equipmentForm.value.desc_equipment,
        prix: parseFloat(this.equipmentForm.value.prix), // Convert to number
        location: this.equipmentForm.value.location,
        availability: this.equipmentForm.value.availability,
        image_equip: this.equipmentForm.value.image_equip,
        id_equipment: this.data.equipment?.id_equipment
      };
  
      this.dialogRef.close(equipmentData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}