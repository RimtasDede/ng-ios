import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignalStrComponent } from './signal-str.component';

describe('SignalStrComponent', () => {
  let component: SignalStrComponent;
  let fixture: ComponentFixture<SignalStrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalStrComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalStrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
