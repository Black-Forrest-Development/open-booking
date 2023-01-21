import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestConfirmationDialogComponent } from './request-confirmation-dialog.component';

describe('RequestConfirmationDialogComponent', () => {
  let component: RequestConfirmationDialogComponent;
  let fixture: ComponentFixture<RequestConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestConfirmationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
