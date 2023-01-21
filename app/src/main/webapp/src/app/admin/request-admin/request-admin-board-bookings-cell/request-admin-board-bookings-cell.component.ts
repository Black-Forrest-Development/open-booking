import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookingRequestInfo, defaultBookingRequestInfo} from "../model/request-admin-api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RequestAdminService} from "../model/request-admin.service";
import {TranslateService} from "@ngx-translate/core";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {GenericRequestResult} from "../../../shared/shared-api";
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-request-admin-board-bookings-cell',
  templateUrl: './request-admin-board-bookings-cell.component.html',
  styleUrls: ['./request-admin-board-bookings-cell.component.scss']
})
export class RequestAdminBoardBookingsCellComponent {
  @Input() data: BookingRequestInfo = defaultBookingRequestInfo
  @Output() change = new EventEmitter<Boolean>()
  fg: FormGroup = this.fb.group({
    offer: ['', Validators.required],
  })

  changing: boolean = false

  private snackbarConfig = new MatSnackBarConfig()

  constructor(
    private fb: FormBuilder,
    private service: RequestAdminService,
    private translationService: TranslateService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
  }

  confirm() {
    // if (this.fg.invalid) return
    // if (this.changing) return
    //
    // let dialogRef = this.dialog.open(RequestConfirmMessageDialogComponent, {
    //   data: this.data,
    //   height: '700px',
    //   width: '800px',
    // })
    // dialogRef.afterClosed().subscribe(() => {
    //     this.changing = true
    //
    //     let bookingId = this.fg.get('offer')?.value
    //     this.service.confirmBookingRequest(this.data.id, bookingId).subscribe(r => this.handleConfirmed(r))
    //   }
    // )


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
