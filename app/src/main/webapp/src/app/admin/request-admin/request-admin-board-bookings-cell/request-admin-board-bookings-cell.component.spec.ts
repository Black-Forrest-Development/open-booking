import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAdminBoardBookingsCellComponent } from './request-admin-board-bookings-cell.component';

describe('RequestAdminBoardBookingsCellComponent', () => {
  let component: RequestAdminBoardBookingsCellComponent;
  let fixture: ComponentFixture<RequestAdminBoardBookingsCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestAdminBoardBookingsCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestAdminBoardBookingsCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
