import { TestBed } from '@angular/core/testing';

import { LmsSharedService } from './lms-shared.service';

describe('LmsSharedService', () => {
  let service: LmsSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LmsSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
