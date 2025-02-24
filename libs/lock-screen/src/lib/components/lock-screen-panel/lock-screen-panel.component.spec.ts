import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LockScreenPanelComponent } from './lock-screen-panel.component';

describe('LockScreenPanelComponent', () => {
  let component: LockScreenPanelComponent;
  let fixture: ComponentFixture<LockScreenPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LockScreenPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LockScreenPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
