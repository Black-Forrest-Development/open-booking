import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestConfirmMessageDialogComponent } from './request-confirm-message-dialog.component';

describe('RequestConfirmMessageDialogComponent', () => {
  let component: RequestConfirmMessageDialogComponent;
  let fixture: ComponentFixture<RequestConfirmMessageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestConfirmMessageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestConfirmMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
