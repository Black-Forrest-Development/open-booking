import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoardBookingRequestComponent } from './admin-board-booking-request.component';

describe('AdminBoardBookingRequestComponent', () => {
  let component: AdminBoardBookingRequestComponent;
  let fixture: ComponentFixture<AdminBoardBookingRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBoardBookingRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBoardBookingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
