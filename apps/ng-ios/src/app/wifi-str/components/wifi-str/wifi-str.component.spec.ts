import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WifiStrComponent } from './wifi-str.component';

describe('WifiStrComponent', () => {
  let component: WifiStrComponent;
  let fixture: ComponentFixture<WifiStrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WifiStrComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WifiStrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
