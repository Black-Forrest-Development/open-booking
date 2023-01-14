import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAdminBoardComponent } from './text-admin-board.component';

describe('TextAdminBoardComponent', () => {
  let component: TextAdminBoardComponent;
  let fixture: ComponentFixture<TextAdminBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextAdminBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextAdminBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
