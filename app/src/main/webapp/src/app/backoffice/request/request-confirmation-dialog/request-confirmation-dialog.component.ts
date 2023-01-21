import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BookingRequestInfo} from "../../../admin/request-admin/model/request-admin-api";
import {BookingInfo} from "../../../booking/model/booking-api";
import {BookingRequestService} from "../model/booking-request.service";
import {ResolvedResponse} from "../../response/model/response-api";
import {FormBuilder, Validators} from "@angular/forms";
import {BookingConfirmationContent} from "../model/booking-request-api";

@Component({
  selector: 'app-request-confirmation-dialog',
  templateUrl: './request-confirmation-dialog.component.html',
  styleUrls: ['./request-confirmation-dialog.component.scss']
})
export class RequestConfirmationDialogComponent {

  loading: boolean = false

  response: ResolvedResponse | undefined

  fg = this.fb.group({
      subject: ['', Validators.required],
      content: ['', Validators.required],
      silent: [false, Validators.required],
    }
  )

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: RequestConfirmMessageDialogData,
    public dialogRef: MatDialogRef<RequestConfirmationDialogComponent>,
    private fb: FormBuilder,
    private service: BookingRequestService
  ) {
  }

  ngOnInit(): void {
    this.loadResponse()
  }

  private loadResponse() {
    if (this.loading) return
    this.loading = true

    this.service.getConfirmationMessage(this.data.info.id, this.data.selectedBooking.id).subscribe(r => this.handleConfirmationMessage(r))
  }

  private handleConfirmationMessage(response: ResolvedResponse) {
    this.response = response
    this.fg.setValue({
      subject: response.title,
      content: response.content,
      silent: false
    })
    this.loading = false
  }

  onCancelClick(): void {
    this.dialogRef.close(null)
  }

  onConfirmClick() {
    if (this.fg.invalid) return
    let value = this.fg.value
    let content = new BookingConfirmationContent(
      value.subject ?? "",
      value.content ?? "",
      value.silent ?? false
    )
    this.dialogRef.close(content)
  }

}

export interface RequestConfirmMessageDialogData {
  info: BookingRequestInfo,
  selectedBooking: BookingInfo
}
