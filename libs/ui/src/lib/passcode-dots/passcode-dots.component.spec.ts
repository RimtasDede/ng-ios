import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasscodeDotsComponent } from './passcode-dots.component';

describe('PasscodeDotsComponent', () => {
  let component: PasscodeDotsComponent;
  let fixture: ComponentFixture<PasscodeDotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasscodeDotsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasscodeDotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
