import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppTabComponent } from './app-tab.component';

describe('TabsTabComponent', () => {
  let component: AppTabComponent;
  let fixture: ComponentFixture<AppTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
