import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookingRequestInfo, defaultBookingRequestInfo} from "../../../admin/request-admin/model/request-admin-api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {GenericRequestResult} from "../../../shared/shared-api";
import {BookingRequestService} from "../model/booking-request.service";
import {RequestConfirmationDialogComponent} from "../request-confirmation-dialog/request-confirmation-dialog.component";
import {HotToastService} from "@ngneat/hot-toast";
import {BookingConfirmationContent} from "../model/booking-request-api";

@Component({
  selector: 'app-request-board-booking-cell',
  templateUrl: './request-board-booking-cell.component.html',
  styleUrls: ['./request-board-booking-cell.component.scss']
})
export class RequestBoardBookingCellComponent {
  @Input() data: BookingRequestInfo = defaultBookingRequestInfo
  @Output() change = new EventEmitter<Boolean>()
  fg: FormGroup = this.fb.group({
    booking: ['', Validators.required],
  })

  changing: boolean = false


  constructor(
    private fb: FormBuilder,
    private service: BookingRequestService,
    private translationService: TranslateService,
    private toastService: HotToastService,
    private dialog: MatDialog
  ) {
  }

  confirm() {
    if (this.fg.invalid) return
    if (this.changing) return
    let selectedBookingId = this.fg.value.booking
    let selectedBooking = this.data.bookings.find(b => b.id == selectedBookingId)
    if (!selectedBooking) return

    let dialogRef = this.dialog.open(RequestConfirmationDialogComponent, {
      data: {info: this.data, selectedBooking: selectedBooking},
      height: '700px',
      width: '800px',
    })

    dialogRef.afterClosed().subscribe(result => {
        if (!result) return
        let content = result as BookingConfirmationContent
        this.changing = true
        this.service.confirmBookingRequest(this.data.id, selectedBookingId, content).subscribe(r => this.handleResult(r))
      }
    )
  }

  denial() {
    if (this.changing) return
    this.changing = true

    this.service.denialBookingRequest(this.data.id).subscribe(r => this.handleResult(r))
  }

  private handleResult(result: GenericRequestResult) {
    this.changing = false
    let message = this.translationService.instant(result.msg)
    if (result.success) {
      this.toastService.success(message)
    } else {
      this.toastService.error(message)
    }
    this.change.emit(true)
  }
}
