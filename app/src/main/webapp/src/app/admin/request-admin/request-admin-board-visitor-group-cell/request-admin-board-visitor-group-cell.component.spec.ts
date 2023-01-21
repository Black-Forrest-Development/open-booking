import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RequestAdminBoardVisitorGroupCellComponent} from './request-admin-board-visitor-group-cell.component';

describe('RequestAdminBoardVisitorGroupCellComponent', () => {
  let component: RequestAdminBoardVisitorGroupCellComponent;
  let fixture: ComponentFixture<RequestAdminBoardVisitorGroupCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestAdminBoardVisitorGroupCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestAdminBoardVisitorGroupCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
