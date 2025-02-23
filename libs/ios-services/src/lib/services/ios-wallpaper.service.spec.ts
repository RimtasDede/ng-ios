import { TestBed } from '@angular/core/testing';

import { IosWallpaperService } from './ios-wallpaper.service';

describe('IosWallpaperService', () => {
  let service: IosWallpaperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IosWallpaperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
