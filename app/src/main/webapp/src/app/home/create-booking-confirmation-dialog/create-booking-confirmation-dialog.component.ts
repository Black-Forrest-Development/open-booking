import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CreateBookingRequest} from "../../booking/model/booking-api";

@Component({
  selector: 'app-create-booking-confirmation-dialog',
  templateUrl: './create-booking-confirmation-dialog.component.html',
  styleUrls: ['./create-booking-confirmation-dialog.component.scss']
})
export class CreateBookingConfirmationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CreateBookingRequest,
    public dialogRef: MatDialogRef<CreateBookingConfirmationDialogComponent>
  ) {
  }
}
