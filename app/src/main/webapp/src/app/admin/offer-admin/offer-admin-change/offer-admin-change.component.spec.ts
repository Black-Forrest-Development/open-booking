import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferAdminChangeComponent } from './offer-admin-change.component';

describe('OfferAdminChangeComponent', () => {
  let component: OfferAdminChangeComponent;
  let fixture: ComponentFixture<OfferAdminChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferAdminChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferAdminChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
