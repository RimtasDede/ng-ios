import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppLibraryComponent } from './app-library.component';

describe('AppLibraryComponent', () => {
  let component: AppLibraryComponent;
  let fixture: ComponentFixture<AppLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppLibraryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
