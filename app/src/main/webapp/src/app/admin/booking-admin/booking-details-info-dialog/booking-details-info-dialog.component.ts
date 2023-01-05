import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BookingDetails} from "../model/booking-admin-api";

@Component({
  selector: 'app-booking-details-info-dialog',
  templateUrl: './booking-details-info-dialog.component.html',
  styleUrls: ['./booking-details-info-dialog.component.scss']
})
export class BookingDetailsInfoDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<BookingDetailsInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BookingDetails | undefined,
  ) {
  }

}
