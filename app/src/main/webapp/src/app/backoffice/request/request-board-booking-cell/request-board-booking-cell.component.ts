import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookingRequestInfo, defaultBookingRequestInfo} from "../../../admin/request-admin/model/request-admin-api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {RequestConfirmMessageDialogComponent} from "../../../admin/request-admin/request-confirm-message-dialog/request-confirm-message-dialog.component";
import {GenericRequestResult} from "../../../shared/shared-api";
import {BookingRequestService} from "../model/booking-request.service";

@Component({
  selector: 'app-request-board-booking-cell',
  templateUrl: './request-board-booking-cell.component.html',
  styleUrls: ['./request-board-booking-cell.component.scss']
})
export class RequestBoardBookingCellComponent {
  @Input() data: BookingRequestInfo = defaultBookingRequestInfo
  @Output() change = new EventEmitter<Boolean>()
  fg: FormGroup = this.fb.group({
    offer: ['', Validators.required],
  })

  changing: boolean = false

  private snackbarConfig = new MatSnackBarConfig()

  constructor(
    private fb: FormBuilder,
    private service: BookingRequestService,
    private translationService: TranslateService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
  }

  confirm() {
    if (this.fg.invalid) return
    if (this.changing) return

    let dialogRef = this.dialog.open(RequestConfirmMessageDialogComponent, {
      data: this.data,
      height: '700px',
      width: '800px',
    })
    dialogRef.afterClosed().subscribe(() => {
        this.changing = true

        let bookingId = this.fg.get('offer')?.value
        this.service.confirmBookingRequest(this.data.id, bookingId).subscribe(r => this.handleConfirmed(r))
      }
    )


  }

  private handleConfirmed(result: GenericRequestResult) {
    this.changing = false
    let message = this.translationService.instant(result.msg)
    this.snackBar.open(message, 'OK', this.snackbarConfig)
      .afterDismissed()
      .subscribe(() => this.change.emit(true))
  }

  denial() {
    if (this.changing) return
    this.changing = true

    this.service.denialBookingRequest(this.data.id).subscribe(r => this.handleDenied(r))
  }

  private handleDenied(result: GenericRequestResult) {
    this.changing = false
    let message = this.translationService.instant(result.msg)
    this.snackBar.open(message, 'OK', this.snackbarConfig)
      .afterDismissed()
      .subscribe(() => this.change.emit(true))
  }
}
