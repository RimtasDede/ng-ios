import { TestBed } from '@angular/core/testing';

import { TouchOptionsService } from './touch-options.service';

describe('TouchOptionsService', () => {
  let service: TouchOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouchOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
