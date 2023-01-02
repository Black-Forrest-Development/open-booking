import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAdminBoardComponent } from './request-admin-board.component';

describe('RequestAdminBoardComponent', () => {
  let component: RequestAdminBoardComponent;
  let fixture: ComponentFixture<RequestAdminBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestAdminBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestAdminBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
