import { TestBed } from '@angular/core/testing';

import { IosScreenService } from './ios-screen.service';

describe('IosScreenService', () => {
  let service: IosScreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IosScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
