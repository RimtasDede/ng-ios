import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppTabLabelComponent } from './app-tab-label.component';

describe('AppTabLabelComponent', () => {
  let component: AppTabLabelComponent;
  let fixture: ComponentFixture<AppTabLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTabLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppTabLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
