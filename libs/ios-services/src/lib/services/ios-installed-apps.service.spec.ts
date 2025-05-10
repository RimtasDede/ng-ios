import { TestBed } from '@angular/core/testing';

import { IosInstalledAppsService } from './ios-installed-apps.service';

describe('IosInstalledAppsService', () => {
  let service: IosInstalledAppsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IosInstalledAppsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
