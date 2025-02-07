import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservationFormComponent } from './reservation-form.component';
import { ReservationService } from '../../services/reservation.service';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('ReservationFormComponent', () => {
  let component: ReservationFormComponent;
  let fixture: ComponentFixture<ReservationFormComponent>;
  let mockReservationService: jasmine.SpyObj<ReservationService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockHttpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    mockReservationService = jasmine.createSpyObj('ReservationService', ['createReservation']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['getCurrentUser'], {
      user: of({ idUser: 1 })
    });
    mockHttpClient = jasmine.createSpyObj('HttpClient', ['post']);

    await TestBed.configureTestingModule({
      imports: [ReservationFormComponent, ReactiveFormsModule],
      providers: [
        { provide: ReservationService, useValue: mockReservationService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: HttpClient, useValue: mockHttpClient }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.reservationForm.get('date')?.value).toBe('');
    expect(component.reservationForm.get('timeSlot')?.value).toBe('');
  });

  it('should mark form as invalid when empty', () => {
    expect(component.reservationForm.valid).toBeFalse();
  });

  it('should mark form as valid when all fields are filled', () => {
    component.reservationForm.patchValue({
      date: '2025-01-26',
      timeSlot: '08:00-09:00'
    });
    expect(component.reservationForm.valid).toBeTrue();
  });

  it('should update clientId on init', () => {
    expect(component.clientId).toBe(1);
  });

  it('should have predefined time slots', () => {
    expect(component.timeSlots.length).toBeGreaterThan(0);
    expect(component.timeSlots).toContain('08:00-09:00');
  });
});
