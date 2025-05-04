import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppSettingsIconComponent } from './app-settings-icon.component';

describe('AppSettingsIconComponent', () => {
  let component: AppSettingsIconComponent;
  let fixture: ComponentFixture<AppSettingsIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSettingsIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppSettingsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
