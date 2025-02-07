import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EquipmentDialogComponent } from './equipment-dialog.component';

describe('EquipmentDialogComponent', () => {
  let component: EquipmentDialogComponent;
  let fixture: ComponentFixture<EquipmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {
          equipment: {
            id_equipment: 1,
            nom_equipment: 'Test Equipment',
            desc_equipment: 'Test Description',
            image_equip: 'test.jpg',
            prix: 50,
            availability: 'available',
            managerId: 1,
            location: 'Test Location'
          }
        }}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EquipmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
