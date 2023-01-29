import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoardOfferComponent } from './admin-board-offer.component';

describe('AdminBoardOfferComponent', () => {
  let component: AdminBoardOfferComponent;
  let fixture: ComponentFixture<AdminBoardOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBoardOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBoardOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
