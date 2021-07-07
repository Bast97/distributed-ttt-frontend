import { TestBed } from '@angular/core/testing';

import { OverviewCommService } from './overview-comm.service';

describe('OverviewCommService', () => {
  let service: OverviewCommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverviewCommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
