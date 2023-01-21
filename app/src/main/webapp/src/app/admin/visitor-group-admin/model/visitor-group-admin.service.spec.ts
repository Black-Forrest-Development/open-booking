import {TestBed} from '@angular/core/testing';

import {VisitorGroupAdminService} from './visitor-group-admin.service';

describe('VisitorGroupAdminService', () => {
  let service: VisitorGroupAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitorGroupAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
