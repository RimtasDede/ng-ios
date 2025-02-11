import { TestBed } from '@angular/core/testing';

import { IosBatteryService } from './ios-battery.service';

describe('IosBatteryService', () => {
  let service: IosBatteryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IosBatteryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
