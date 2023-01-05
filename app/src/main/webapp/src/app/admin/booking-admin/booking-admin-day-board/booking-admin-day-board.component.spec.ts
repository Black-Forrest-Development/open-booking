import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingAdminDayBoardComponent } from './booking-admin-day-board.component';

describe('BookingAdminDayBoardComponent', () => {
  let component: BookingAdminDayBoardComponent;
  let fixture: ComponentFixture<BookingAdminDayBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingAdminDayBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingAdminDayBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
