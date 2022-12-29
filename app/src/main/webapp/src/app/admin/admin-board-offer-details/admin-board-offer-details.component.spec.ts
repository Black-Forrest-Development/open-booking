import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoardOfferDetailsComponent } from './admin-board-offer-details.component';

describe('AdminBoardOfferDetailsComponent', () => {
  let component: AdminBoardOfferDetailsComponent;
  let fixture: ComponentFixture<AdminBoardOfferDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBoardOfferDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBoardOfferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
