import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppClockIconComponent } from './app-clock-icon.component';

describe('AppClockIconComponent', () => {
  let component: AppClockIconComponent;
  let fixture: ComponentFixture<AppClockIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppClockIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppClockIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
