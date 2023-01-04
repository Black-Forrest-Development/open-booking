import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";
import {OfferAdminService} from "../model/offer-admin.service";
import {TranslateService} from "@ngx-translate/core";
import {OfferRangeRequest} from "../model/offer-admin-api";
import * as moment from "moment";
import {GenericRequestResult} from "../../../shared/shared-api";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from "@angular/material-moment-adapter";

@Component({
  selector: 'app-offer-admin-create-range-dialog',
  templateUrl: './offer-admin-create-range-dialog.component.html',
  styleUrls: ['./offer-admin-create-range-dialog.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ],
})
export class OfferAdminCreateRangeDialogComponent {
  loading: boolean = false

  date = this.fb.group({
      dateFrom: new FormControl<Date | null>(null, Validators.required),
      dateTo: new FormControl<Date | null>(null, Validators.required),
    }
  )

  form: FormGroup = this.fb.group({
      date: this.date,
      timeFrom: ['', Validators.required],
      timeTo: ['', Validators.required],
      duration: ['', Validators.required],
      interval: ['', Validators.required],
      maxPersons: ['', Validators.required]
    }
  )

  private snackbarConfig = new MatSnackBarConfig()

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<OfferAdminCreateRangeDialogComponent>,
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
    debugger
    if (!request) {
      this.showFormInvalidError()
    } else {
      this.service.createOfferRange(request).subscribe((result) => this.handleResult(result))
    }
  }

  close() {
    this.dialogRef.close()
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

  private get request(): OfferRangeRequest {
    let value = this.form.value
    let date = value.date
    let dateFrom = moment(date.dateFrom).format("YYYY-MM-DD")
    let dateTo = moment(date.dateTo).format("YYYY-MM-DD")
    let duration = moment.duration(value.duration, 'minutes').toISOString()
    let interval = moment.duration(value.interval, 'minutes').toISOString()
    return new OfferRangeRequest(
      value.maxPersons,
      dateFrom,
      dateTo,
      value.timeFrom,
      value.timeTo,
      duration,
      interval
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
