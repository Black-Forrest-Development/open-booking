import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RequestAdminBoardEntryComponent} from './request-admin-board-entry.component';

describe('RequestAdminBoardEntryComponent', () => {
  let component: RequestAdminBoardEntryComponent;
  let fixture: ComponentFixture<RequestAdminBoardEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestAdminBoardEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestAdminBoardEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
