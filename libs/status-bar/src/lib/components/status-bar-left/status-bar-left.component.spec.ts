import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusBarLeftComponent } from './status-bar-left.component';

describe('StatusBarLeftComponent', () => {
  let component: StatusBarLeftComponent;
  let fixture: ComponentFixture<StatusBarLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusBarLeftComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusBarLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
