import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoardOfferDailyComponent } from './admin-board-offer-daily.component';

describe('AdminBoardOfferDailyComponent', () => {
  let component: AdminBoardOfferDailyComponent;
  let fixture: ComponentFixture<AdminBoardOfferDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBoardOfferDailyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBoardOfferDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
