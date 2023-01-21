import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OfferBookingDetailsComponent} from './offer-booking-details.component';

describe('OfferBookingDetailsComponent', () => {
  let component: OfferBookingDetailsComponent;
  let fixture: ComponentFixture<OfferBookingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferBookingDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
