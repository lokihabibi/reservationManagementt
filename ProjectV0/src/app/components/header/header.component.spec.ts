import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle mobile menu', () => {
    expect(component.isMobileMenuOpen).toBeFalse();
    component.toggleMobileMenu();
    expect(component.isMobileMenuOpen).toBeTrue();
  });

  it('should toggle theme', () => {
    expect(component.isDarkTheme).toBeFalse();
    component.toggleTheme();
    expect(component.isDarkTheme).toBeTrue();
  });

  it('should update scroll state on window scroll', () => {
    const scrollEvent = new Event('scroll');
    window.dispatchEvent(scrollEvent);
    expect(component.isScrolled).toBeDefined();
  });

  it('should have logo', () => {
    const logo = el.query(By.css('.logo'));
    expect(logo).toBeTruthy();
  });

  it('should have navigation links', () => {
    const navLinks = el.queryAll(By.css('.nav-link'));
    expect(navLinks.length).toBeGreaterThan(0);
  });

  it('should have theme toggle button', () => {
    const themeToggle = el.query(By.css('.theme-toggle'));
    expect(themeToggle).toBeTruthy();
  });

  it('should have mobile menu toggle', () => {
    const menuToggle = el.query(By.css('.mobile-menu-toggle'));
    expect(menuToggle).toBeTruthy();
  });

  it('should add scrolled class when scrolled', () => {
    component.isScrolled = true;
    fixture.detectChanges();
    const header = el.query(By.css('.header'));
    expect(header.nativeElement.classList.contains('scrolled')).toBeTrue();
  });

  it('should show correct theme icon', () => {
    const themeIcon = el.query(By.css('.theme-toggle .fas'));
    expect(themeIcon.nativeElement.classList.contains('fa-moon')).toBeTrue();
    
    component.isDarkTheme = true;
    fixture.detectChanges();
    expect(themeIcon.nativeElement.classList.contains('fa-sun')).toBeTrue();
  });

  it('should show/hide mobile menu on toggle', () => {
    const nav = el.query(By.css('.nav'));
    expect(nav.nativeElement.classList.contains('open')).toBeFalse();
    
    component.toggleMobileMenu();
    fixture.detectChanges();
    expect(nav.nativeElement.classList.contains('open')).toBeTrue();
  });

  it('should cleanup scroll listener on destroy', () => {
    const removeEventListenerSpy = spyOn(window, 'removeEventListener');
    component.ngOnDestroy();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', jasmine.any(Function));
  });
});
