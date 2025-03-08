import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeIndicatorComponent } from './home-indicator.component';

describe('HomeIndicatorComponent', () => {
  let component: HomeIndicatorComponent;
  let fixture: ComponentFixture<HomeIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeIndicatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
