import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { RouterModule } from '@angular/router';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent, RouterModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render hero title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('.hero-title');
    expect(title?.textContent?.length).toBeGreaterThan(0);
  });

  it('should render hero subtitle', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const subtitle = compiled.querySelector('.hero-subtitle');
    expect(subtitle?.textContent?.length).toBeGreaterThan(0);
  });

  it('should have call-to-action button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const ctaButton = compiled.querySelector('.cta-button');
    expect(ctaButton).toBeTruthy();
    expect(ctaButton?.textContent?.length).toBeGreaterThan(0);
  });

  it('should have proper background styling', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heroSection = compiled.querySelector('.hero-section');
    expect(heroSection).toBeTruthy();
    const styles = window.getComputedStyle(heroSection as Element);
    expect(styles.backgroundImage).toBeDefined();
  });

  it('should have router link in CTA button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const ctaButton = compiled.querySelector('.cta-button');
    expect(ctaButton?.hasAttribute('routerLink')).toBeTruthy();
  });
});
