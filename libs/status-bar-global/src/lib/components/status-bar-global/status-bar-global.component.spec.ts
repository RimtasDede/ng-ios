import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusBarGlobalComponent } from './status-bar-global.component';

describe('StatusBarGlobalComponent', () => {
  let component: StatusBarGlobalComponent;
  let fixture: ComponentFixture<StatusBarGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusBarGlobalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusBarGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
