import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TerrainService } from '../../services/terrain.service';
import { Terrain } from '../../models/terrain.model';
import { MatDialog } from '@angular/material/dialog';
import { ReservationFormComponent } from '../reservation-form/reservation-form.component';
import { RapportDialogComponent } from '../rapport-dialog/rapport-dialog.component';

@Component({
  selector: 'app-terrain-section',
  templateUrl: './terrain-section.component.html',
  styleUrls: ['./terrain-section.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class TerrainSectionComponent implements OnInit {
  terrains: Terrain[] = [];
  currentIndex = 0;
  maxIndex = 0;

  constructor(
    private terrainService: TerrainService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadTerrains();
    window.addEventListener('resize', () => {
      this.updateMaxIndex();
    });
  }

  loadTerrains() {
    this.terrainService.getAllTerrains().subscribe(
      (data) => {
        this.terrains = data;
        this.updateMaxIndex();
      },
      (error) => {
        console.error('Error loading terrains:', error);
      }
    );
  }

  updateMaxIndex() {
    this.maxIndex = Math.max(0, this.terrains.length - 1);
  }

  slidePrev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  slideNext() {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
    }
  }

  openRapportDialog(terrain: Terrain) {
    this.dialog.open(RapportDialogComponent, {
      width: '500px',
      data: {
        terrainId: terrain.id_terrain,
        equipmentId: null,
        managerId: terrain.managerId || 1
      }
    });
  }

  openReservationForm(terrain: Terrain) {
    this.dialog.open(ReservationFormComponent, {
      width: '500px',
      data: {
        terrainId: terrain.id_terrain,
        equipmentId: null,
        managerId: terrain.managerId
      }
    });
  }
}
