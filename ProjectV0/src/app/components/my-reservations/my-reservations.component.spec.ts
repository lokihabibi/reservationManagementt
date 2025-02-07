import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyReservationsComponent } from './my-reservations.component';
import { ReservationService } from '../../services/reservation.service';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

describe('MyReservationsComponent', () => {
  let component: MyReservationsComponent;
  let fixture: ComponentFixture<MyReservationsComponent>;
  let mockReservationService: jasmine.SpyObj<ReservationService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockReservationService = jasmine.createSpyObj('ReservationService', ['getClientReservations', 'cancelReservation']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['getCurrentUser']);

    await TestBed.configureTestingModule({
      imports: [MyReservationsComponent],
      providers: [
        { provide: ReservationService, useValue: mockReservationService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    mockAuthService.getCurrentUser.and.returnValue({ id: 1 });
    mockReservationService.getClientReservations.and.returnValue(of([]));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load reservations on init', () => {
    expect(mockReservationService.getClientReservations).toHaveBeenCalledWith(1);
  });

  it('should return correct status class', () => {
    expect(component.getStatusClass('pending')).toBe('pending');
    expect(component.getStatusClass('confirmed')).toBe('confirmed');
    expect(component.getStatusClass('cancelled')).toBe('cancelled');
  });

  it('should cancel reservation', () => {
    mockReservationService.cancelReservation.and.returnValue(of({}));
    component.cancelReservation(1);
    expect(mockReservationService.cancelReservation).toHaveBeenCalledWith(1);
  });
});
