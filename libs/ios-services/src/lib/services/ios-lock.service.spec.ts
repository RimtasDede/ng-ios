import { TestBed } from '@angular/core/testing';

import { IosLockService } from './ios-lock.service';

describe('IosLockService', () => {
  let service: IosLockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IosLockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
