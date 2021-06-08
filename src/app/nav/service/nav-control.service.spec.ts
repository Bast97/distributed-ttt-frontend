import { TestBed } from '@angular/core/testing';

import { NavControlService } from './nav-control.service';

describe('NavControlService', () => {
  let service: NavControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
