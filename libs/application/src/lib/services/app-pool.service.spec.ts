import { TestBed } from '@angular/core/testing';

import { AppPoolService } from './app-pool.service';

describe('AppPoolService', () => {
  let service: AppPoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppPoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
