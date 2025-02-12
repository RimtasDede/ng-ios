import { TestBed } from '@angular/core/testing';

import { IosDateTimeService } from './ios-date-time.service';

describe('IosDateTimeService', () => {
  let service: IosDateTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IosDateTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
