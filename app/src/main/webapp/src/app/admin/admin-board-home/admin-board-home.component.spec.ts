import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoardHomeComponent } from './admin-board-home.component';

describe('AdminBoardHomeComponent', () => {
  let component: AdminBoardHomeComponent;
  let fixture: ComponentFixture<AdminBoardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBoardHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBoardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
