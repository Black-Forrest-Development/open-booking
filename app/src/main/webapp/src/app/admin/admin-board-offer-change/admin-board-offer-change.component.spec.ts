import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoardOfferChangeComponent } from './admin-board-offer-change.component';

describe('AdminBoardOfferChangeComponent', () => {
  let component: AdminBoardOfferChangeComponent;
  let fixture: ComponentFixture<AdminBoardOfferChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBoardOfferChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBoardOfferChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
