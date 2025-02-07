import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { AuthService } from '../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardLayoutComponent', () => {
  let component: DashboardLayoutComponent;
  let fixture: ComponentFixture<DashboardLayoutComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['logout', 'isLoggedIn', 'userValue']);
    
    await TestBed.configureTestingModule({
      imports: [DashboardLayoutComponent, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: spy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout when logout button is clicked', () => {
    authService.logout.and.returnValue();
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('should display user name from auth service', () => {
    const mockUser = { prenom_user: 'John' };
    authService.userValue = mockUser;
    expect(component.userName).toBe('John');
  });

  it('should display default user name when no user is logged in', () => {
    authService.userValue = null;
    expect(component.userName).toBe('User');
  });
});
