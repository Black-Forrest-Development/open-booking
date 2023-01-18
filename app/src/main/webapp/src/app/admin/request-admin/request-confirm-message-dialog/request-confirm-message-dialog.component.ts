import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BookingRequestInfo} from "../model/request-admin-api";

@Component({
  selector: 'app-request-confirm-message-dialog',
  templateUrl: './request-confirm-message-dialog.component.html',
  styleUrls: ['./request-confirm-message-dialog.component.scss']
})
export class RequestConfirmMessageDialogComponent {


  html: string = ""

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BookingRequestInfo,
    public dialogRef: MatDialogRef<RequestConfirmMessageDialogComponent>
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }
}
