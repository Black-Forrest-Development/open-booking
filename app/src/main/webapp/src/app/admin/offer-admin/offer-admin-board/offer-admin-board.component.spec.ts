import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferAdminBoardComponent } from './offer-admin-board.component';

describe('OfferAdminBoardComponent', () => {
  let component: OfferAdminBoardComponent;
  let fixture: ComponentFixture<OfferAdminBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferAdminBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferAdminBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
