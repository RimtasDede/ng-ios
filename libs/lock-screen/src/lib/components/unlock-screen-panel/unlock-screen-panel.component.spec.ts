import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnlockScreenPanelComponent } from './unlock-screen-panel.component';

describe('UnlockScreenPanelComponent', () => {
  let component: UnlockScreenPanelComponent;
  let fixture: ComponentFixture<UnlockScreenPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnlockScreenPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UnlockScreenPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
