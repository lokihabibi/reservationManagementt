import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { MatDialog } from '@angular/material/dialog';
import { Terrain } from '../../models/terrain.model';
import { TerrainService } from '../../services/terrain.service';
import { RapportDialogComponent } from '../rapport-dialog/rapport-dialog.component';
import { ReservationFormComponent } from '../reservation-form/reservation-form.component';

@Component({
  selector: 'app-terrain',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './terrain.component.html',
  styleUrl: './terrain.component.css'
})
export class TerrainComponent implements OnInit {
  @ViewChild('sliderContainer') sliderContainer!: ElementRef;
  
  terrains: Terrain[] = [];
  currentIndex = 0;
  itemsToShow = 3;
  maxIndex = 0;
  selectedTerrain: Terrain | null = null;
 
  constructor(
    private terrainService: TerrainService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadTerrains();
    this.updateItemsToShow();
    window.addEventListener('resize', () => {
      this.updateItemsToShow();
      this.updateMaxIndex();
    });
  }

  loadTerrains() {
    this.terrainService.getAllTerrains().subscribe(
      (data) => {
        this.terrains = data;
        this.updateItemsToShow();
        this.updateMaxIndex();
      },
      (error) => {
        console.error('Error loading terrains:', error);
      }
    );
  }

  updateItemsToShow() {
    if (window.innerWidth < 768) {
      this.itemsToShow = 1;
    } else if (window.innerWidth < 1024) {
      this.itemsToShow = 2;
    } else {
      this.itemsToShow = 3;
    }
    this.updateMaxIndex();
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
        equipmentId: null,
        terrainId: terrain.id_terrain,
        managerId: terrain.managerId
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