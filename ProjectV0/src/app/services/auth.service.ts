import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, debounceTime } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8006/api/user';
  private sessionTimer: any;
  private activityTimeout: any;
  private readonly USER_KEY = 'user';
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Initialize BehaviorSubject first
    this.userSubject = new BehaviorSubject<any>(null);
    this.user = this.userSubject.asObservable();

    // Then try to load stored user
    const storedUser = this.loadUser();
    if (storedUser) {
      this.userSubject.next(storedUser);
      this.checkSession();
    }

    // Add event listeners for user activity
    if (typeof window !== 'undefined') {
      ['click', 'keypress'].forEach(event => {
        window.addEventListener(event, () => this.debouncedUpdateActivity());
      });
    }
  }

  private loadUser(): any {
    try {
      const storedUser = localStorage.getItem(this.USER_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error('Error loading stored user:', e);
      this.clearUserData();
      return null;
    }
  }

  private clearUserData(): void {
    localStorage.removeItem(this.USER_KEY);
    if (this.userSubject) {
      this.userSubject.next(null);
    }
    this.stopSessionTimer();
  }

  private saveUser(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.userSubject.next(user);
  }

  private checkSession(): void {
    const user = this.userValue;
    if (!user) return;

    const lastActivity = user.lastActivity || 0;
    if (Date.now() - lastActivity > 24 * 60 * 60 * 1000) {
      this.logout();
    } else {
      this.startSessionTimer();
    }
  }

  private startSessionTimer(): void {
    if (this.sessionTimer) {
      clearInterval(this.sessionTimer);
    }
    // Set up session timer (e.g., 24 hours)
    this.sessionTimer = setInterval(() => {
      this.logout();
    }, 24 * 60 * 60 * 1000);
  }

  private stopSessionTimer(): void {
    if (this.sessionTimer) {
      clearInterval(this.sessionTimer);
      this.sessionTimer = null;
    }
  }

  private debouncedUpdateActivity(): void {
    if (this.activityTimeout) {
      clearTimeout(this.activityTimeout);
    }
    this.activityTimeout = setTimeout(() => {
      this.updateActivity();
    }, 1000); // Debounce for 1 second
  }

  private updateActivity(): void {
    if (this.userValue) {
      const user = { ...this.userValue, lastActivity: Date.now() };
      this.saveUser(user);
      this.startSessionTimer();
    }
  }

  public get userValue() {
    return this.userSubject?.value;
  }

  login(email: string, password: string) {
    const body = {
      email: email,
      password: password
    };
    return this.http.post(`${this.apiUrl}/login`, body).pipe(
      map((response: any) => {
        if (response && response.user) {
          console.log('Login response:', response); // Debug log
          const userWithDefaults = {
            ...response.user,
            lastActivity: Date.now(),
            settings: response.user.settings || {
              emailNotifications: true,
              language: 'en'
            }
          };
          this.saveUser(userWithDefaults);
          this.startSessionTimer();
          return response;
        }
        throw new Error('Invalid response from server');
      })
    );
  }

  logout() {
    this.clearUserData();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.userValue;
  }

  getRole(): string {
    return this.userValue?.role || '';
  }

  getDashboardUrl(): string {
    const role = this.getRole().toLowerCase();
    switch (role) {
      case 'admin':
        return '/admin-dashboard';
      case 'manager':
        return '/manager-dashboard';
      default:
        return '/user-dashboard';
    }
  }

  getCurrentUser(): any {
    const user = this.userValue;
    console.log('Getting current user:', user); // Debug log
    return user;
  }

  updateUserSettings(updatedUser: any): Observable<any> {
    console.log('Current user before update:', this.userValue);
    console.log('Updating user with:', updatedUser);

    if (!updatedUser || !updatedUser.idUser) {
      return new Observable(observer => {
        observer.error('User not found');
      });
    }

    // Make sure to include all required fields
    const updateData = {
      prenomUser: updatedUser.prenomUser,
      nomUser: updatedUser.nomUser,
      emailUser: updatedUser.emailUser,
      telUser: updatedUser.telUser,
      adresseUser: updatedUser.adresseUser,
      role: updatedUser.role,
      passwordUser: updatedUser.passwordUser
    };

    // Use PUT with the user ID in the URL path
    return this.http.put(`${this.apiUrl}/${updatedUser.idUser}`, updateData).pipe(
      map((response: any) => {
        if (response) {
          const updatedUserData = {
            ...this.userValue,
            ...response
          };
          this.saveUser(updatedUserData);
          return updatedUserData;
        }
        throw new Error('Invalid response from server');
      })
    );
  }
}
