import { TestBed } from '@angular/core/testing';

import { IosSignalService } from './ios-signal.service';

describe('IosSignalService', () => {
  let service: IosSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IosSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
