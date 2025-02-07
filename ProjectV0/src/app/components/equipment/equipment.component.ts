import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EquipmentService } from '../../services/equipment.service';
import { Equipment } from '../../models/equipment.model';
import { MatDialog } from '@angular/material/dialog';
import { ReservationFormComponent } from '../reservation-form/reservation-form.component';
import { RapportDialogComponent } from '../rapport-dialog/rapport-dialog.component';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class EquipmentComponent implements OnInit {
  @ViewChild('sliderContainer') sliderContainer!: ElementRef;
  
  equipments: Equipment[] = [];
  currentIndex = 0;
  itemsToShow = 3;
  maxIndex = 0;
  selectedEquipment: Equipment | null = null;

  constructor(
    private equipmentService: EquipmentService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadEquipments();
    this.updateItemsToShow();
    window.addEventListener('resize', () => {
      this.updateItemsToShow();
      this.updateMaxIndex();
    });
  }

  loadEquipments() {
    this.equipmentService.getAllEquipments().subscribe(
      (data) => {
        this.equipments = data;
        this.updateItemsToShow();
        this.updateMaxIndex();
      },
      (error) => {
        console.error('Error loading equipments:', error);
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
    this.maxIndex = Math.max(0, this.equipments.length - 1);
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

  openRapportDialog(equipment: Equipment) {
    this.dialog.open(RapportDialogComponent, {
      width: '500px',
      data: {
        equipmentId: equipment.id_equipment,
        terrainId: null,
        managerId: equipment.managerId
      }
    });
  }

  openReservationForm(equipment: Equipment) {
    this.dialog.open(ReservationFormComponent, {
      width: '500px',
      data: {
        terrainId: null,
        equipmentId: equipment.id_equipment,
        managerId: equipment.managerId
      }
    });
  }
}