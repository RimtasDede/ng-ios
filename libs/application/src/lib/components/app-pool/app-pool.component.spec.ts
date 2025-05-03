import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppPoolComponent } from './app-pool.component';

describe('AppPoolComponent', () => {
  let component: AppPoolComponent;
  let fixture: ComponentFixture<AppPoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPoolComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
