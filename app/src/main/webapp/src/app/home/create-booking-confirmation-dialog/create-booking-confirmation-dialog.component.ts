import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HomeService} from "../model/home.service";
import {TranslateService} from "@ngx-translate/core";
import {defaultResolvedResponse, Reference, ResolvedResponse, ResolveResponseRequest, RESPONSE_TYPE_BOOKING_REQUEST_RECEIVED} from "../../backoffice/response/model/response-api";
import {BookingRequest} from "../../admin/request-admin/model/request-admin-api";

@Component({
  selector: 'app-create-booking-confirmation-dialog',
  templateUrl: './create-booking-confirmation-dialog.component.html',
  styleUrls: ['./create-booking-confirmation-dialog.component.scss']
})
export class CreateBookingConfirmationDialogComponent {

  loading: boolean = false

  info: ResolvedResponse = defaultResolvedResponse

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BookingRequest,
    public dialogRef: MatDialogRef<CreateBookingConfirmationDialogComponent>,
    private service: HomeService,
    private translateService: TranslateService
  ) {
    this.loading = true
    let request = new ResolveResponseRequest(
      translateService.currentLang,
      RESPONSE_TYPE_BOOKING_REQUEST_RECEIVED,
      new Reference(data.id, "BookingRequest")
    )
    this.service.resolveResponse(request).subscribe(r => this.handleData(r))
  }

  private handleData(r: ResolvedResponse) {
    this.info = r
    this.loading = false
  }
}
