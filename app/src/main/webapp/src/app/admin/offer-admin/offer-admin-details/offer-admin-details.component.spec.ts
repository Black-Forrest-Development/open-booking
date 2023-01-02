import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferAdminDetailsComponent } from './offer-admin-details.component';

describe('OfferAdminDetailsComponent', () => {
  let component: OfferAdminDetailsComponent;
  let fixture: ComponentFixture<OfferAdminDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferAdminDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferAdminDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
