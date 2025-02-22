import { TestBed } from '@angular/core/testing';

import { IosWifiService } from './ios-wifi.service';

describe('IosWifiService', () => {
  let service: IosWifiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IosWifiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
