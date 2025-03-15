import { TestBed } from '@angular/core/testing';

import { TouchEventManagerService } from './touch-event-manager.service';

describe('TouchEventManagerService', () => {
  let service: TouchEventManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouchEventManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
