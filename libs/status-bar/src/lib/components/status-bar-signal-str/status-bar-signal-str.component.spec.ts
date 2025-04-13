import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusBarSignalStrComponent } from './status-bar-signal-str.component';

describe('StatusBarSignalStrComponent', () => {
  let component: StatusBarSignalStrComponent;
  let fixture: ComponentFixture<StatusBarSignalStrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusBarSignalStrComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusBarSignalStrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
