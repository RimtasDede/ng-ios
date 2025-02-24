import { TestBed } from '@angular/core/testing';

import { IosCommonService } from './ios-common.service';

describe('IosCommonService', () => {
  let service: IosCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IosCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
