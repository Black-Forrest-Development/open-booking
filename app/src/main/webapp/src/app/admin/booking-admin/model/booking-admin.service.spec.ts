import { TestBed } from '@angular/core/testing';

import { BookingAdminService } from './booking-admin.service';

describe('BookingAdminService', () => {
  let service: BookingAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
