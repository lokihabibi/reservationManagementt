import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Terrain } from '../../models/terrain.model';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-terrain-dialog',
  templateUrl: './terrain-dialog.component.html',
  styleUrls: ['./terrain-dialog.component.css'],
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
export class TerrainDialogComponent {
  terrainForm: FormGroup;
  managers: User[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<TerrainDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { terrain: Terrain | null }
  ) {
    this.terrainForm = this.fb.group({
      name: [data.terrain?.name || '', Validators.required],
      location: [data.terrain?.location || '', Validators.required],
      prix_heur: [data.terrain?.prix_heur || '', [Validators.required, Validators.min(0)]],
      desc_terrain: [data.terrain?.desc_terrain || ''],
      image_terrain: [data.terrain?.image_terrain || ''],
      availability: [data.terrain?.availability || 'available', Validators.required],
      managerId: [data.terrain?.managerId || '', Validators.required]
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
    if (this.terrainForm.valid) {
      const terrainData = {
        ...this.terrainForm.value,
        id_terrain: this.data.terrain?.id_terrain
      };
      this.dialogRef.close(terrainData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
