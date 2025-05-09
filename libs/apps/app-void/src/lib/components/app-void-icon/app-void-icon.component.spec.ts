import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppVoidIconComponent } from './app-void-icon.component';

describe('AppVoidIconComponent', () => {
  let component: AppVoidIconComponent;
  let fixture: ComponentFixture<AppVoidIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppVoidIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppVoidIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
