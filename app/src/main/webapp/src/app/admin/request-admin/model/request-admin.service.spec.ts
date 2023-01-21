import {TestBed} from '@angular/core/testing';

import {RequestAdminService} from './request-admin.service';

describe('RequestAdminService', () => {
  let service: RequestAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
