import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusBarBatteryComponent } from './status-bar-battery.component';

describe('StatusBarBatteryComponent', () => {
  let component: StatusBarBatteryComponent;
  let fixture: ComponentFixture<StatusBarBatteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusBarBatteryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusBarBatteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
