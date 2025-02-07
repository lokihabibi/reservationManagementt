import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { RapportService } from '../../services/rapport.service';
import { EquipmentService } from '../../services/equipment.service';
import { TerrainService } from '../../services/terrain.service';
import { AuthService } from '../../services/auth.service';
import { Rapport } from '../../models/rapport.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface DialogData {
  equipmentId: number | null;
  terrainId: number | null;
  managerId: number | null;
}

@Component({
  selector: 'app-rapport-dialog',
  templateUrl: './rapport-dialog.component.html',
  styleUrls: ['./rapport-dialog.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class RapportDialogComponent implements OnInit {
  description: string = '';
  isVisible: boolean = true;
  managerId: number | null = null;
  currentUserId: number | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(
    private rapportService: RapportService,
    private equipmentService: EquipmentService,
    private terrainService: TerrainService,
    private authService: AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<RapportDialogComponent>
  ) {}

  ngOnInit() {
    // Get current user from auth service
    const user = this.authService.userValue;
    console.log('Current user:', user);
    
    if (!user) {
      console.error('User not logged in');
      this.router.navigate(['/login']);
      return;
    }

    // Set current user ID from the auth service
    this.currentUserId = user.idUser;
    console.log('Set current user ID:', this.currentUserId);

    // Set manager ID from dialog data
    this.managerId = this.data.managerId;
    console.log('Set manager ID from dialog data:', this.managerId);

    // If manager ID is not in dialog data, try to get it from equipment or terrain
    if (!this.managerId) {
      this.isLoading = true;
      if (this.data.equipmentId) {
        this.equipmentService.getEquipmentById(this.data.equipmentId).subscribe({
          next: (equipment) => {
            this.managerId = equipment.managerId;
            console.log('Set manager ID from equipment:', this.managerId);
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error fetching equipment:', error);
            this.error = 'Failed to get manager information from equipment';
            this.isLoading = false;
          }
        });
      } else if (this.data.terrainId) {
        this.terrainService.getTerrainById(this.data.terrainId).subscribe({
          next: (terrain) => {
            this.managerId = terrain.managerId;
            console.log('Set manager ID from terrain:', this.managerId);
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error fetching terrain:', error);
            this.error = 'Failed to get manager information from terrain';
            this.isLoading = false;
          }
        });
      } else {
        this.error = 'No equipment or terrain information provided';
        this.isLoading = false;
      }
    }
  }

  onSubmit(): void {
    if (this.isLoading) {
      this.error = 'Please wait while we fetch the manager information';
      return;
    }

    // Clear any previous errors
    this.error = null;

    // Check for required IDs
    if (!this.currentUserId) {
      const user = this.authService.userValue;
      if (user) {
        this.currentUserId = user.idUser;
      }
      
      if (!this.currentUserId) {
        this.error = 'You must be logged in to submit a report';
        this.router.navigate(['/login']);
        return;
      }
    }
    
    if (!this.managerId) {
      this.error = 'Manager information is not available. Please try again later.';
      return;
    }

    if (!this.description.trim()) {
      this.error = 'Please provide a description';
      return;
    }

    this.isLoading = true;
    const rapport: Rapport = {
      description: this.description,
      idUser: this.currentUserId,
      idManager: this.managerId,
      idEquipment: this.data.equipmentId || undefined,
      idTerrain: this.data.terrainId || undefined
    };

    console.log('Submitting rapport:', rapport);

    this.rapportService.createRapport(rapport).subscribe({
      next: (response) => {
        console.log('Rapport created successfully:', response);
        this.isLoading = false;
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error creating rapport:', error);
        this.error = 'Failed to submit report. Please try again.';
        this.isLoading = false;
      }
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
