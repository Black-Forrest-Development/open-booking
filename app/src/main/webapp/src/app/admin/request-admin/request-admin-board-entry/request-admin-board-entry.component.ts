import {Component, EventEmitter, Input, Output} from '@angular/core';
import { BookingRequestInfo, defaultBookingRequestInfo} from "../model/request-admin-api";
import {ThemePalette} from "@angular/material/core";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_RADIO_DEFAULT_OPTIONS} from "@angular/material/radio";
import {RequestAdminService} from "../model/request-admin.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {GenericRequestResult} from "../../../shared/shared-api";

@Component({
  selector: 'app-request-admin-board-entry',
  templateUrl: './request-admin-board-entry.component.html',
  styleUrls: ['./request-admin-board-entry.component.scss'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: {color: 'primary'},
  }]
})
export class RequestAdminBoardEntryComponent {
  @Input() data: BookingRequestInfo = defaultBookingRequestInfo
  @Input() expanded: boolean = false
  @Output() change = new EventEmitter<Boolean>()

  private snackbarConfig = new MatSnackBarConfig()

  fg: FormGroup = this.fb.group({
    offer: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private service: RequestAdminService,
    private translationService: TranslateService,
    private snackBar: MatSnackBar,) {
  }

  getStatusColor(status: string): ThemePalette {
    if (status == 'UNKNOWN') return 'warn'
    if (status == 'UNCONFIRMED') return 'primary'
    return undefined;
  }

  changing: boolean = false

  confirm() {
    if (this.fg.invalid) return
    if (this.changing) return
    this.changing = true

    let bookingId = this.fg.get('offer')?.value
    this.service.confirmBookingRequest(this.data.id, bookingId).subscribe(r => this.handleConfirmed(r))
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
