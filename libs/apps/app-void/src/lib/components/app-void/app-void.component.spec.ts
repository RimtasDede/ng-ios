import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppVoidComponent } from './app-void.component';

describe('AppVoidComponent', () => {
  let component: AppVoidComponent;
  let fixture: ComponentFixture<AppVoidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppVoidComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppVoidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
