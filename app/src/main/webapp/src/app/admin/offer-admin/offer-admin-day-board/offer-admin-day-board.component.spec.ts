import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferAdminDayBoardComponent } from './offer-admin-day-board.component';

describe('OfferAdminDayBoardComponent', () => {
  let component: OfferAdminDayBoardComponent;
  let fixture: ComponentFixture<OfferAdminDayBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferAdminDayBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferAdminDayBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
