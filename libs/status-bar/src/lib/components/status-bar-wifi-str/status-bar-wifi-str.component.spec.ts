import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusBarWifiStrComponent } from './status-bar-wifi-str.component';

describe('StatusBarWifiStrComponent', () => {
  let component: StatusBarWifiStrComponent;
  let fixture: ComponentFixture<StatusBarWifiStrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusBarWifiStrComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusBarWifiStrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
