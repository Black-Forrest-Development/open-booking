import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoardBookingComponent } from './admin-board-booking.component';

describe('AdminBoardBookingComponent', () => {
  let component: AdminBoardBookingComponent;
  let fixture: ComponentFixture<AdminBoardBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBoardBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBoardBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
