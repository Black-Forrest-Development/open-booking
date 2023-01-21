import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OfferAdminCreateRangeDialogComponent} from './offer-admin-create-range-dialog.component';

describe('OfferAdminCreateRangeDialogComponent', () => {
  let component: OfferAdminCreateRangeDialogComponent;
  let fixture: ComponentFixture<OfferAdminCreateRangeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferAdminCreateRangeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferAdminCreateRangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
