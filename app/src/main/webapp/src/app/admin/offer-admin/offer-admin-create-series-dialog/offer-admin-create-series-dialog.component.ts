import {Component} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {OfferAdminService} from "../model/offer-admin.service";
import {TranslateService} from "@ngx-translate/core";
import {OfferSeriesRequest} from "../model/offer-admin-api";
import * as moment from "moment/moment";
import {GenericRequestResult} from "../../../shared/shared-api";

@Component({
  selector: 'app-offer-admin-create-series-dialog',
  templateUrl: './offer-admin-create-series-dialog.component.html',
  styleUrls: ['./offer-admin-create-series-dialog.component.scss']
})
export class OfferAdminCreateSeriesDialogComponent {

  loading: boolean = false

  form: FormGroup = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      duration: ['', Validators.required],
      interval: ['', Validators.required],
      quantity: ['', Validators.required],
      maxPersons: ['', Validators.required],
      minTime: ['', Validators.required],
      maxTime: ['', Validators.required],
    }
  )

  private snackbarConfig = new MatSnackBarConfig()

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<OfferAdminCreateSeriesDialogComponent>,
              public service: OfferAdminService,
              private snackBar: MatSnackBar,
              private translationService: TranslateService
  ) {
    this.snackbarConfig.horizontalPosition = 'center';
    this.snackbarConfig.verticalPosition = 'bottom';
    this.snackbarConfig.duration = 5000;
    this.snackbarConfig.panelClass = ['snack-success'];
  }

  save() {
    if (this.form.invalid) {
      this.validateForm()
      this.showFormInvalidError()
      return
    }
    let request = this.request
    if (!request) {
      this.showFormInvalidError()
    } else {
      this.service.createOfferSeries(request).subscribe((result) => this.handleResult(result))
    }
  }

  private validateForm() {
    this.form.markAllAsTouched()
  }

  private showFormInvalidError() {
    this.translationService.get("OFFER.MESSAGE.ERROR.FORM_INVALID").subscribe(
      msg => this.snackBar.open(msg, 'OK', this.snackbarConfig)
        .afterDismissed()
        .subscribe(() => this.dialogRef.close())
    )
  }

  close() {
    this.dialogRef.close()
  }

  private get request(): OfferSeriesRequest | null {
    let value = this.form.value

    let date = value.date
    let startTime = value.time

    let startDateTime = this.service.createDateTime(startTime, date)?.format("YYYY-MM-DD[T]HH:mm:ss")
    let duration = moment.duration(value.duration, 'minutes').toISOString()
    let interval = moment.duration(value.interval, 'minutes').toISOString()
    if (!startDateTime) return null
    return new OfferSeriesRequest(
      value.maxPersons,
      startDateTime,
      duration,
      interval,
      value.quantity,
      value.minTime,
      value.maxTime
    )
  }

  private handleResult(result: GenericRequestResult) {
    if (result == null) {
      this.translationService.get("OFFER.MESSAGE.ERROR.CREATION_FAILED").subscribe(
        msg => this.snackBar.open(msg, 'OK', this.snackbarConfig)
          .afterDismissed()
          .subscribe(() => this.dialogRef.close())
      )
    } else if (!result.success) {
      this.translationService.get(result.msg).subscribe(
        msg => this.snackBar.open(msg, 'OK', this.snackbarConfig)
          .afterDismissed()
          .subscribe(() => this.dialogRef.close())
      )
    } else {
      this.dialogRef.close(result)
    }
  }
}
