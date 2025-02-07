import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { RouterModule } from '@angular/router';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, RouterModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have company logo', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logo = compiled.querySelector('.footer-logo');
    expect(logo).toBeTruthy();
  });

  it('should have social media links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const socialLinks = compiled.querySelectorAll('.social-links a');
    expect(socialLinks.length).toBeGreaterThan(0);
  });

  it('should have navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navLinks = compiled.querySelectorAll('.footer-nav a');
    expect(navLinks.length).toBeGreaterThan(0);
  });

  it('should have contact information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const contactInfo = compiled.querySelector('.contact-info');
    expect(contactInfo).toBeTruthy();
  });

  it('should have copyright text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const copyright = compiled.querySelector('.copyright');
    expect(copyright?.textContent).toContain('2025');
  });

  it('should have proper styling classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const footer = compiled.querySelector('footer');
    expect(footer?.classList.contains('footer')).toBeTrue();
  });

  it('should have all footer sections', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const sections = compiled.querySelectorAll('.footer-section');
    expect(sections.length).toBeGreaterThan(0);
  });
});
