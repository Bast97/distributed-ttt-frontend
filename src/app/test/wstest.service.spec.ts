import { TestBed } from '@angular/core/testing';

import { WstestService } from './wstest.service';

describe('WstestService', () => {
  let service: WstestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WstestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
