import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppClockComponent } from './app-clock.component';

describe('AppClockComponent', () => {
  let component: AppClockComponent;
  let fixture: ComponentFixture<AppClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppClockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
