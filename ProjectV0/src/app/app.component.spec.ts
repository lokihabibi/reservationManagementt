import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppComponent,
        HeaderComponent,
        FooterComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with scroll button hidden', () => {
    expect(component.showScrollButton).toBeFalse();
  });

  it('should show scroll button when scrolled past threshold', () => {
    // Mock window scroll
    window.scrollY = 500;
    component.checkScrollPosition();
    expect(component.showScrollButton).toBeTrue();
  });

  it('should hide scroll button when scrolled to top', () => {
    // Mock window scroll
    window.scrollY = 0;
    component.checkScrollPosition();
    expect(component.showScrollButton).toBeFalse();
  });
});
