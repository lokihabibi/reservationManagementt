import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TerrainDialogComponent } from './terrain-dialog.component';
import { TerrainService } from '../../services/terrain.service';
import { UserService } from '../../services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

describe('TerrainDialogComponent', () => {
  let component: TerrainDialogComponent;
  let fixture: ComponentFixture<TerrainDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<TerrainDialogComponent>>;
  let mockTerrainService: jasmine.SpyObj<TerrainService>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockTerrainService = jasmine.createSpyObj('TerrainService', ['createTerrain', 'updateTerrain']);
    mockUserService = jasmine.createSpyObj('UserService', ['getManagers']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        TerrainDialogComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: TerrainService, useValue: mockTerrainService },
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TerrainDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values when no terrain data is provided', () => {
    expect(component.terrainForm.get('nom_terrain')?.value).toBe('');
    expect(component.terrainForm.get('description_terrain')?.value).toBe('');
    expect(component.terrainForm.get('emplacement_terrain')?.value).toBe('');
    expect(component.terrainForm.get('prix_location')?.value).toBe('');
    expect(component.terrainForm.get('manager_id')?.value).toBe('');
  });

  // Add more tests as needed
});
