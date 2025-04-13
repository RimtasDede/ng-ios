import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusBarTimeComponent } from './status-bar-time.component';

describe('StatusBarTimeComponent', () => {
  let component: StatusBarTimeComponent;
  let fixture: ComponentFixture<StatusBarTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusBarTimeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusBarTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
