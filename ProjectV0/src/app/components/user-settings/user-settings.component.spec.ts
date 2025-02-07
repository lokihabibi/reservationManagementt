import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSettingsComponent } from './user-settings.component';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

describe('UserSettingsComponent', () => {
  let component: UserSettingsComponent;
  let fixture: ComponentFixture<UserSettingsComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['userValue']);
    
    await TestBed.configureTestingModule({
      imports: [UserSettingsComponent, FormsModule],
      providers: [
        { provide: AuthService, useValue: spy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user information from auth service', () => {
    const mockUser = {
      prenom_user: 'John',
      email: 'john@example.com',
      role: 'client'
    };
    authService.userValue = mockUser;

    expect(component.userName).toBe('John');
    expect(component.userEmail).toBe('john@example.com');
    expect(component.userRole).toBe('client');
  });

  it('should show default values when user info is not available', () => {
    authService.userValue = null;

    expect(component.userName).toBe('Not available');
    expect(component.userEmail).toBe('Not available');
    expect(component.userRole).toBe('Not available');
  });

  it('should have default settings values', () => {
    expect(component.emailNotifications).toBe(true);
    expect(component.language).toBe('en');
  });

  it('should log settings when save is called', () => {
    spyOn(console, 'log');
    component.saveSettings();
    expect(console.log).toHaveBeenCalledWith('Settings saved:', {
      emailNotifications: true,
      language: 'en'
    });
  });
});
