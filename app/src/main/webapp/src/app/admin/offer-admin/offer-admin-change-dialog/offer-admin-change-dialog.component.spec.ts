import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferAdminChangeDialogComponent } from './offer-admin-change-dialog.component';

describe('OfferAdminChangeDialogComponent', () => {
  let component: OfferAdminChangeDialogComponent;
  let fixture: ComponentFixture<OfferAdminChangeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferAdminChangeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferAdminChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
