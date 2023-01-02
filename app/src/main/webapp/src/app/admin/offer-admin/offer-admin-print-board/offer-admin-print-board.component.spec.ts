import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferAdminPrintBoardComponent } from './offer-admin-print-board.component';

describe('OfferAdminPrintBoardComponent', () => {
  let component: OfferAdminPrintBoardComponent;
  let fixture: ComponentFixture<OfferAdminPrintBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferAdminPrintBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferAdminPrintBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
