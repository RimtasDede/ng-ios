import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeScreenFavAppsBarComponent } from './home-screen-fav-apps-bar.component';

describe('HomeScreenFavAppsBarComponent', () => {
  let component: HomeScreenFavAppsBarComponent;
  let fixture: ComponentFixture<HomeScreenFavAppsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeScreenFavAppsBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeScreenFavAppsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
