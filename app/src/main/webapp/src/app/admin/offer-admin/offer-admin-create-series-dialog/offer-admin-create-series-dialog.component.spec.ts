import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferAdminCreateSeriesDialogComponent } from './offer-admin-create-series-dialog.component';

describe('OfferAdminCreateSeriesDialogComponent', () => {
  let component: OfferAdminCreateSeriesDialogComponent;
  let fixture: ComponentFixture<OfferAdminCreateSeriesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferAdminCreateSeriesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferAdminCreateSeriesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
