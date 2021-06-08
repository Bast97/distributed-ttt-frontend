import { TestBed } from '@angular/core/testing';

import { SocketInterfaceService } from './socket-interface.service';

describe('SocketInterfaceService', () => {
  let service: SocketInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
