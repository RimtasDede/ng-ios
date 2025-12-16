import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppTabIconComponent } from './app-tab-icon.component';

describe('AppTabIconComponent', () => {
  let component: AppTabIconComponent;
  let fixture: ComponentFixture<AppTabIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTabIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppTabIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
