import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HowItWorksComponent } from './how-it-works.component';

describe('HowItWorksComponent', () => {
  let component: HowItWorksComponent;
  let fixture: ComponentFixture<HowItWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowItWorksComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowItWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all steps', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const steps = compiled.querySelectorAll('.step');
    expect(steps.length).toBeGreaterThan(0);
  });

  it('should have correct step content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const stepTitles = compiled.querySelectorAll('.step-title');
    const stepDescriptions = compiled.querySelectorAll('.step-description');

    expect(stepTitles.length).toEqual(stepDescriptions.length);
    stepTitles.forEach(title => {
      expect(title.textContent?.trim().length).toBeGreaterThan(0);
    });
    stepDescriptions.forEach(desc => {
      expect(desc.textContent?.trim().length).toBeGreaterThan(0);
    });
  });

  it('should have icons for each step', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const stepIcons = compiled.querySelectorAll('.step-icon');
    expect(stepIcons.length).toBeGreaterThan(0);
    stepIcons.forEach(icon => {
      expect(icon.querySelector('i')).toBeTruthy();
    });
  });

  it('should have proper styling classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const section = compiled.querySelector('.how-it-works-section');
    expect(section).toBeTruthy();
    expect(section?.classList.contains('section')).toBeTruthy();
  });
});
