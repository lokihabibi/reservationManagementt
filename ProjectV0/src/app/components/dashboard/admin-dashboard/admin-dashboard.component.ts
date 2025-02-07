import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user.model';
import { Terrain } from '../../../models/terrain.model';
import { Equipment } from '../../../models/equipment.model';
import { UserService } from '../../../services/user.service';
import { TerrainService } from '../../../services/terrain.service';
import { EquipmentService } from '../../../services/equipment.service';
import { UserDialogComponent } from '../../user-dialog/user-dialog.component';
import { TerrainDialogComponent } from '../../terrain-dialog/terrain-dialog.component';
import { EquipmentDialogComponent } from '../../../components/equipment-dialog/equipment-dialog.component';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatCardModule,
    MatTooltipModule
  ]
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  terrains: Terrain[] = [];
  equipments: Equipment[] = [];
  filteredUsers: User[] = [];
  filteredTerrains: Terrain[] = [];
  filteredEquipments: Equipment[] = [];
  activeTab: string = 'users';

  constructor(
    private userService: UserService,
    private terrainService: TerrainService,
    private equipmentService: EquipmentService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadTerrains();
    this.loadEquipments();
  }

  onTabChange(event: any) {
    const tabIndex = event.index;
    switch (tabIndex) {
      case 0:
        this.activeTab = 'users';
        break;
      case 1:
        this.activeTab = 'terrains';
        break;
      case 2:
        this.activeTab = 'equipments';
        break;
    }
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
      },
      error: (error: Error) => {
        console.error('Error loading users:', error);
        this.showError('Failed to load users');
      }
    });
  }

  loadTerrains() {
    this.terrainService.getAllTerrains().subscribe({
      next: (terrains) => {
        this.terrains = terrains;
        this.filteredTerrains = terrains;
      },
      error: (error: Error) => {
        console.error('Error loading terrains:', error);
        this.showError('Failed to load terrains');
      }
    });
  }

  loadEquipments() {
    this.equipmentService.getAllEquipments().subscribe({
      next: (equipments) => {
        this.equipments = equipments;
        this.filteredEquipments = equipments;
      },
      error: (error: Error) => {
        console.error('Error loading equipments:', error);
        this.showError('Failed to load equipments');
      }
    });
  }

  applyFilter(event: Event, type: 'users' | 'terrains' | 'equipments') {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    
    switch (type) {
      case 'users':
        this.filteredUsers = this.users.filter(user =>
          user.prenomUser.toLowerCase().includes(filterValue) ||
          user.nomUser.toLowerCase().includes(filterValue) ||
          user.emailUser.toLowerCase().includes(filterValue)
        );
        break;
      case 'terrains':
        this.filteredTerrains = this.terrains.filter(terrain =>
          terrain.name.toLowerCase().includes(filterValue) ||
          terrain.location.toLowerCase().includes(filterValue)
        );
        break;
      case 'equipments':
        this.filteredEquipments = this.equipments.filter(equipment =>
          equipment.nom_equipment.toLowerCase().includes(filterValue) ||
          equipment.desc_equipment.toLowerCase().includes(filterValue)
        );
        break;
    }
  }

  openUserDialog(user?: User) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: { user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.idUser) {
          this.updateUser(result);
        } else {
          this.createUser(result);
        }
      }
    });
  }

  openTerrainDialog(terrain?: Terrain) {
    const dialogRef = this.dialog.open(TerrainDialogComponent, {
      width: '400px',
      data: { terrain: terrain }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id_terrain) {
          this.updateTerrain(result);
        } else {
          this.createTerrain(result);
        }
      }
    });
  }

  openEquipmentDialog(equipment?: Equipment) {
    const dialogRef = this.dialog.open(EquipmentDialogComponent, {
      width: '400px',
      data: { equipment: equipment }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id_equipment) {
          this.updateEquipment(result);
        } else {
          this.createEquipment(result);
        }
      }
    });
  }

  createUser(user: User) {
    this.userService.createUser(user).subscribe({
      next: () => {
        this.loadUsers();
        this.showSuccess('User created successfully');
      },
      error: (error: Error) => {
        console.error('Error creating user:', error);
        this.showError('Failed to create user');
      }
    });
  }

  updateUser(user: User) {
    this.userService.updateUser(user.idUser!, user).subscribe({
      next: () => {
        this.loadUsers();
        this.showSuccess('User updated successfully');
      },
      error: (error: Error) => {
        console.error('Error updating user:', error);
        this.showError('Failed to update user');
      }
    });
  }

  deleteUser(user: User) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete User',
        message: `Are you sure you want to delete ${user.prenomUser} ${user.nomUser}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.idUser!).subscribe({
          next: () => {
            this.loadUsers();
            this.showSuccess('User deleted successfully');
          },
          error: (error: Error) => {
            console.error('Error deleting user:', error);
            this.showError('Failed to delete user');
          }
        });
      }
    });
  }

  createTerrain(terrain: Terrain) {
    this.terrainService.createTerrain(terrain).subscribe({
      next: () => {
        this.loadTerrains();
        this.showSuccess('Terrain created successfully');
      },
      error: (error: Error) => {
        console.error('Error creating terrain:', error);
        this.showError('Failed to create terrain');
      }
    });
  }

  updateTerrain(terrain: Terrain) {
    this.terrainService.updateTerrain(terrain.id_terrain!, terrain).subscribe({
      next: () => {
        this.loadTerrains();
        this.showSuccess('Terrain updated successfully');
      },
      error: (error: Error) => {
        console.error('Error updating terrain:', error);
        this.showError('Failed to update terrain');
      }
    });
  }

  deleteTerrain(terrain: Terrain) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Terrain',
        message: `Are you sure you want to delete ${terrain.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.terrainService.deleteTerrain(terrain.id_terrain).subscribe({
          next: () => {
            this.loadTerrains();
            this.showSuccess('Terrain deleted successfully');
          },
          error: (error: Error) => {
            console.error('Error deleting terrain:', error);
            this.showError('Failed to delete terrain');
          }
        });
      }
    });
  }

  createEquipment(equipment: Equipment) {
    this.equipmentService.createEquipment(equipment).subscribe({
      next: () => {
        this.loadEquipments();
        this.showSuccess('Equipment created successfully');
      },
      error: (error: Error) => {
        console.error('Error creating equipment:', error);
        this.showError('Failed to create equipment');
      }
    });
  }

  updateEquipment(equipment: Equipment) {
    this.equipmentService.updateEquipment(equipment.id_equipment!, equipment).subscribe({
      next: () => {
        this.loadEquipments();
        this.showSuccess('Equipment updated successfully');
      },
      error: (error: Error) => {
        console.error('Error updating equipment:', error);
        this.showError('Failed to update equipment');
      }
    });
  }

  deleteEquipment(equipment: Equipment) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Equipment',
        message: `Are you sure you want to delete ${equipment.nom_equipment}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.equipmentService.deleteEquipment(equipment.id_equipment).subscribe({
          next: () => {
            this.loadEquipments();
            this.showSuccess('Equipment deleted successfully');
          },
          error: (error: Error) => {
            console.error('Error deleting equipment:', error);
            this.showError('Failed to delete equipment');
          }
        });
      }
    });
  }

  showSuccess(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}
