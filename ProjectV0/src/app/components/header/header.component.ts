import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isScrolled = false;
  isMobileMenuOpen = false;
  isDarkTheme = false;
  private readonly THEME_KEY = 'theme';
  private resizeListener: (() => void) | null = null;
  private authSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initializeTheme();
    this.setupResizeListener();
    window.addEventListener('scroll', this.handleScroll);
    
    // Subscribe to auth state changes
    this.authSubscription = this.authService.user.subscribe(user => {
      console.log('Auth State:', user);
    });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
    // Clean up auth subscription
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private handleScroll = () => {
    this.isScrolled = window.scrollY > 50;
  };

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  private setupResizeListener() {
    this.resizeListener = () => {
      if (window.innerWidth > 768) {
        this.isMobileMenuOpen = false;
      }
    };
    window.addEventListener('resize', this.resizeListener);
  }

  private initializeTheme() {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    this.isDarkTheme = savedTheme === 'dark';
    this.applyTheme();
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem(this.THEME_KEY, this.isDarkTheme ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme() {
    document.documentElement.classList.toggle('dark-theme', this.isDarkTheme);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUserName(): string {
    const user = this.authService.userValue;
    return user ? `${user.prenomUser} ${user.nomUser}` : '';
  }
}
