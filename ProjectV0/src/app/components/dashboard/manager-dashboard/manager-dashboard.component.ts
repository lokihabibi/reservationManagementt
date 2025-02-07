import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManagerService } from '../../../services/manager.service';
import { AuthService } from '../../../services/auth.service';

interface Reservation {
  idReservation: number;
  userId: number;
  userName: string;
  dateRes: string;
  timeSlot: string;
  status: string;
  terrainId: number;
  terrainName: string;
  equipmentId: number;
  equipmentName: string;
  managerId: number;
}

interface Terrain {
  id_terrain: number;
  name: string;
  location: string;
  prix_heur: number;
  availability: string;
  managerId: number;
  desc_terrain?: string;
  image_terrain?: string;
}

interface Equipment {
  id_equipment: number;
  nom_equipment: string;
  desc_equipment: string;
  prix: number;
  availability: string;
  managerId: number;
  image_equip?: string;
  location: string;
}

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {
  managedTerrains: Terrain[] = [];
  managedEquipments: Equipment[] = [];
  reservations: Reservation[] = [];
  rapports: any[] = [];
  managerId: number | null = null;

  terrainAvailabilityOptions = ['available', 'maintenance', 'unavailable'];
  equipmentAvailabilityOptions = ['available', 'maintenance', 'unavailable'];

  loading = {
    terrains: false,
    equipments: false,
    reservations: false,
    rapports: false
  };

  error = {
    terrains: '',
    equipments: '',
    reservations: '',
    rapports: ''
  };

  constructor(
    private managerService: ManagerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.managerId = user?.idUser || null;
    
    if (this.managerId) {
      this.loadManagedTerrains();
      this.loadManagedEquipments();
      this.loadReservations();
      this.loadRapports();
    } else {
      this.error.terrains = 'User not authenticated';
      this.error.equipments = 'User not authenticated';
      this.error.reservations = 'User not authenticated';
      this.error.rapports = 'User not authenticated';
    }
  }

  loadManagedTerrains(): void {
    if (!this.managerId) return;
    
    this.loading.terrains = true;
    this.error.terrains = '';
    
    this.managerService.getManagedTerrains(this.managerId).subscribe({
      next: (terrains) => {
        console.log('Raw terrain data:', terrains);
        this.managedTerrains = terrains.map(terrain => ({
          id_terrain: terrain.id_terrain || null,
          name: terrain.name || 'N/A',
          location: terrain.location || 'N/A',
          prix_heur: typeof terrain.prix_heur === 'number' ? terrain.prix_heur : null,
          availability: terrain.availability || 'unavailable',
          managerId: terrain.managerId || null,
          desc_terrain: terrain.desc_terrain,
          image_terrain: terrain.image_terrain
        }));
        console.log('Processed terrain data:', this.managedTerrains);
        this.loading.terrains = false;
      },
      error: (error) => {
        console.error('Error loading terrains:', error);
        this.error.terrains = 'Failed to load terrains';
        this.loading.terrains = false;
      }
    });
  }

  loadManagedEquipments(): void {
    if (!this.managerId) return;
    
    this.loading.equipments = true;
    this.error.equipments = '';
    
    this.managerService.getManagedEquipments(this.managerId).subscribe({
      next: (equipments) => {
        console.log('Raw equipment data:', equipments);
        this.managedEquipments = equipments.map(equipment => ({
          id_equipment: equipment.id_equipment || null,
          nom_equipment: equipment.nom_equipment || 'N/A',
          desc_equipment: equipment.desc_equipment || 'N/A',
          prix: typeof equipment.prix === 'number' ? equipment.prix : null,
          availability: equipment.availability || 'unavailable',
          managerId: equipment.managerId || null,
          image_equip: equipment.image_equip,
          location: equipment.location || 'N/A'
        }));
        console.log('Processed equipment data:', this.managedEquipments);
        this.loading.equipments = false;
      },
      error: (error) => {
        console.error('Error loading equipment:', error);
        this.error.equipments = 'Failed to load equipment';
        this.loading.equipments = false;
      }
    });
  }

  loadReservations(): void {
    if (!this.managerId) return;
    
    this.loading.reservations = true;
    this.error.reservations = '';
    
    this.managerService.getPendingReservations(this.managerId).subscribe({
      next: (reservations) => {
        this.reservations = reservations.map(res => ({
          ...res,
          userName: res.userName || 'N/A',
          terrainName: res.terrainName || 'N/A',
          equipmentName: res.equipmentName || 'N/A'
        }));
        this.loading.reservations = false;
      },
      error: (error) => {
        console.error('Error loading reservations:', error);
        this.error.reservations = 'Failed to load reservations';
        this.loading.reservations = false;
      }
    });
  }

  loadRapports(): void {
    if (!this.managerId) return;
    
    this.loading.rapports = true;
    this.error.rapports = '';
    
    this.managerService.getManagerRapports(this.managerId).subscribe({
      next: (rapports) => {
        this.rapports = rapports;
        this.loading.rapports = false;
      },
      error: (error) => {
        console.error('Error loading reports:', error);
        this.error.rapports = 'Failed to load reports';
        this.loading.rapports = false;
      }
    });
  }

  updateTerrainStatus(terrainId: number, newStatus: string): void {
    if (!terrainId) {
      console.error('Invalid terrain ID:', terrainId);
      return;
    }

    console.log('Updating terrain status:', { terrainId, newStatus });
    this.managerService.updateTerrainAvailability(terrainId, newStatus).subscribe({
      next: (response) => {
        console.log('Terrain status updated successfully:', response);
        const terrain = this.managedTerrains.find(t => t.id_terrain === terrainId);
        if (terrain) {
          terrain.availability = newStatus;
        }
        this.loadManagedTerrains(); // Refresh the list
      },
      error: (error) => {
        console.error('Error updating terrain status:', error);
        alert('Failed to update terrain status. Please try again.');
        this.loadManagedTerrains();
      }
    });
  }

  updateEquipmentStatus(equipmentId: number, newStatus: string): void {
    if (!equipmentId) {
      console.error('Invalid equipment ID:', equipmentId);
      return;
    }

    console.log('Updating equipment status:', { equipmentId, newStatus });
    this.managerService.updateEquipmentAvailability(equipmentId, newStatus).subscribe({
      next: (response) => {
        console.log('Equipment status updated successfully:', response);
        const equipment = this.managedEquipments.find(e => e.id_equipment === equipmentId);
        if (equipment) {
          equipment.availability = newStatus;
        }
        this.loadManagedEquipments(); // Refresh the list
      },
      error: (error) => {
        console.error('Error updating equipment status:', error);
        alert('Failed to update equipment status. Please try again.');
        this.loadManagedEquipments();
      }
    });
  }

  handleReservation(reservationId: number, action: 'approve' | 'reject'): void {
    if (!reservationId) {
      console.error('Invalid reservation ID:', reservationId);
      alert('Cannot process reservation: Invalid reservation ID');
      return;
    }

    console.log('Handling reservation:', { reservationId, action });
    const status = action === 'approve' ? 'approved' : 'rejected';
    
    this.managerService.handleReservation(reservationId, status).subscribe({
      next: (response) => {
        console.log('Reservation handled successfully:', response);
        // Remove the reservation from the list
        this.reservations = this.reservations.filter(r => r.idReservation !== reservationId);
        // Refresh the lists in case of changes
        this.loadManagedTerrains();
        this.loadManagedEquipments();
        this.loadReservations();
      },
      error: (error) => {
        console.error('Error handling reservation:', error);
        alert(`Failed to ${action} reservation. Please try again.`);
      }
    });
  }
}
