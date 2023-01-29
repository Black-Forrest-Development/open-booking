import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCreateOfferSelectComponent } from './booking-create-offer-select.component';

describe('BookingCreateOfferSelectComponent', () => {
  let component: BookingCreateOfferSelectComponent;
  let fixture: ComponentFixture<BookingCreateOfferSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingCreateOfferSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingCreateOfferSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
