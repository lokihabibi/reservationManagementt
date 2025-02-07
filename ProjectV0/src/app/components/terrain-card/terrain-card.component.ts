import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Terrain } from '../../models/terrain.model';
import { ReservationFormComponent } from '../reservation-form/reservation-form.component';
import { RapportDialogComponent } from '../rapport-dialog/rapport-dialog.component';
import { TerrainDialogComponent } from '../terrain-dialog/terrain-dialog.component';

@Component({
  selector: 'app-terrain-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terrain-card.component.html',
  styleUrls: ['./terrain-card.component.css']
})
export class TerrainCardComponent {
  @Input() terrain!: Terrain;

  constructor(private dialog: MatDialog) {}

  openReservationForm() {
    this.dialog.open(ReservationFormComponent, {
      width: '500px',
      data: {
        terrainId: this.terrain.id_terrain,
        equipmentId: null,
        managerId: this.terrain.managerId
      }
    });
  }

  openRapportDialog() {
    this.dialog.open(RapportDialogComponent, {
      width: '500px',
      data: {
        terrainId: this.terrain.id_terrain,
        equipmentId: null,
        managerId: this.terrain.managerId
      }
    });
  }
}