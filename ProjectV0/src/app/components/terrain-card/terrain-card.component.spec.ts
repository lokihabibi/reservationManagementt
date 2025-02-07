import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerrainCardComponent } from './terrain-card.component';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

describe('TerrainCardComponent', () => {
  let component: TerrainCardComponent;
  let fixture: ComponentFixture<TerrainCardComponent>;
  let el: DebugElement;

  const mockTerrain = {
    id: 1,
    name: 'Test Terrain',
    desc_terrain: 'Test Description',
    image_terrain: 'test-image.jpg',
    prix_heur: 50,
    location: 'Test Location',
    availability: 'available'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerrainCardComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TerrainCardComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    
    // Set up input terrain
    component.terrain = mockTerrain;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display terrain name', () => {
    const nameEl = el.query(By.css('.terrain-name'));
    expect(nameEl.nativeElement.textContent).toContain(mockTerrain.name);
  });

  it('should display terrain price', () => {
    const priceEl = el.query(By.css('.terrain-price'));
    expect(priceEl.nativeElement.textContent).toContain(mockTerrain.prix_heur.toString());
  });

  it('should display terrain location', () => {
    const locationEl = el.query(By.css('.terrain-location'));
    expect(locationEl.nativeElement.textContent).toContain(mockTerrain.location);
  });

  it('should display terrain description', () => {
    const descEl = el.query(By.css('.terrain-description'));
    expect(descEl.nativeElement.textContent).toContain(mockTerrain.desc_terrain);
  });

  it('should display correct availability status', () => {
    const availabilityEl = el.query(By.css('.availability-badge'));
    expect(availabilityEl.nativeElement.textContent.trim()).toBe(mockTerrain.availability);
  });

  it('should use provided image when available', () => {
    const imgEl = el.query(By.css('img'));
    expect(imgEl.nativeElement.src).toContain(mockTerrain.image_terrain);
  });

  it('should use default image when terrain image is not provided', () => {
    component.terrain = { ...mockTerrain, image_terrain: '' };
    fixture.detectChanges();
    const imgEl = el.query(By.css('img'));
    expect(imgEl.nativeElement.src).toContain('assets/default-terrain.jpg');
  });

  it('should add available class when terrain is available', () => {
    const badgeEl = el.query(By.css('.availability-badge'));
    expect(badgeEl.nativeElement.classList.contains('available')).toBeTrue();
  });

  it('should not add available class when terrain is not available', () => {
    component.terrain = { ...mockTerrain, availability: 'booked' };
    fixture.detectChanges();
    const badgeEl = el.query(By.css('.availability-badge'));
    expect(badgeEl.nativeElement.classList.contains('available')).toBeFalse();
  });

  it('should have book now button', () => {
    const buttonEl = el.query(By.css('.book-button'));
    expect(buttonEl.nativeElement.textContent).toContain('Book Now');
  });
});
