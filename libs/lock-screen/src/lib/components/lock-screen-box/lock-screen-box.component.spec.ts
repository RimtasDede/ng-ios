import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LockScreenBoxComponent } from './lock-screen-box.component';

describe('LockScreenBoxComponent', () => {
  let component: LockScreenBoxComponent;
  let fixture: ComponentFixture<LockScreenBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LockScreenBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LockScreenBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
