import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayInfoBoardBookingComponent } from './day-info-board-booking.component';

describe('DayInfoBoardBookingComponent', () => {
  let component: DayInfoBoardBookingComponent;
  let fixture: ComponentFixture<DayInfoBoardBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayInfoBoardBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayInfoBoardBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
