import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TerrainSectionComponent } from './terrain-section.component';
import { TerrainService } from '../../services/terrain.service';
import { TerrainCardComponent } from '../terrain-card/terrain-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TerrainSectionComponent', () => {
  let component: TerrainSectionComponent;
  let fixture: ComponentFixture<TerrainSectionComponent>;
  let terrainService: jasmine.SpyObj<TerrainService>;

  const mockTerrains = [
    {
      id: 1,
      name: 'Terrain 1',
      desc_terrain: 'Description 1',
      image_terrain: 'image1.jpg',
      prix_heur: 50,
      location: 'Location 1',
      availability: 'available'
    },
    {
      id: 2,
      name: 'Terrain 2',
      desc_terrain: 'Description 2',
      image_terrain: 'image2.jpg',
      prix_heur: 60,
      location: 'Location 2',
      availability: 'booked'
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TerrainService', ['getTerrains']);
    spy.getTerrains.and.returnValue(of(mockTerrains));

    await TestBed.configureTestingModule({
      imports: [
        TerrainSectionComponent,
        TerrainCardComponent,
        HttpClientTestingModule
      ],
      providers: [
        { provide: TerrainService, useValue: spy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    terrainService = TestBed.inject(TerrainService) as jasmine.SpyObj<TerrainService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerrainSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load terrains on init', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(terrainService.getTerrains).toHaveBeenCalled();
    expect(component.terrains).toEqual(mockTerrains);
    expect(component.maxIndex).toBe(mockTerrains.length - component.itemsPerView);
  }));

  it('should handle window resize', fakeAsync(() => {
    const originalItemsPerView = component.itemsPerView;
    spyOnProperty(window, 'innerWidth').and.returnValue(500); // Mobile width
    window.dispatchEvent(new Event('resize'));
    tick(100); // Account for debounce time
    expect(component.itemsPerView).not.toBe(originalItemsPerView);
  }));

  it('should slide to next items when possible', () => {
    component.currentIndex = 0;
    component.maxIndex = 1;
    component.slideNext();
    expect(component.currentIndex).toBe(1);
  });

  it('should not slide past the last item', () => {
    component.currentIndex = 1;
    component.maxIndex = 1;
    component.slideNext();
    expect(component.currentIndex).toBe(1);
  });

  it('should slide to previous items when possible', () => {
    component.currentIndex = 1;
    component.slidePrev();
    expect(component.currentIndex).toBe(0);
  });

  it('should not slide before the first item', () => {
    component.currentIndex = 0;
    component.slidePrev();
    expect(component.currentIndex).toBe(0);
  });

  it('should handle touch start', () => {
    const touchEvent = new TouchEvent('touchstart', {
      touches: [{ clientX: 100 } as Touch]
    });
    component.onTouchStart(touchEvent);
    expect(component.touchStartX).toBe(100);
  });

  it('should handle touch end - slide next', () => {
    component.touchStartX = 200;
    const touchEvent = new TouchEvent('touchend', {
      changedTouches: [{ clientX: 50 } as Touch]
    });
    component.onTouchEnd(touchEvent);
    expect(component.currentIndex).toBeGreaterThanOrEqual(0);
  });

  it('should handle touch end - slide prev', () => {
    component.currentIndex = 1;
    component.touchStartX = 50;
    const touchEvent = new TouchEvent('touchend', {
      changedTouches: [{ clientX: 200 } as Touch]
    });
    component.onTouchEnd(touchEvent);
    expect(component.currentIndex).toBeLessThanOrEqual(1);
  });

  it('should update maxIndex when terrains change', () => {
    component.terrains = mockTerrains;
    component.updateMaxIndex();
    expect(component.maxIndex).toBe(mockTerrains.length - component.itemsPerView);
  });

  it('should render terrain cards', () => {
    const cards = fixture.debugElement.queryAll(By.directive(TerrainCardComponent));
    expect(cards.length).toBeGreaterThan(0);
  });
});
