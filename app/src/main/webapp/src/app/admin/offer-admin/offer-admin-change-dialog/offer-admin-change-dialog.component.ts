import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Offer, OfferChangeForm, OfferChangeRequest} from "../model/offer-admin-api";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";
import {Moment} from "moment";
import {OfferAdminService} from "../model/offer-admin.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-offer-admin-change-dialog',
  templateUrl: './offer-admin-change-dialog.component.html',
  styleUrls: ['./offer-admin-change-dialog.component.scss']
})
export class OfferAdminChangeDialogComponent implements OnInit {

  loading: boolean = false
  title: string = ""

  form: FormGroup = this.fb.group({
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      maxPersons: ['', Validators.required],
      active: ['', Validators.required],
    }
  )

  private snackbarConfig = new MatSnackBarConfig()

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<OfferAdminChangeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Offer | undefined,
              public service: OfferAdminService,
              private snackBar: MatSnackBar,
              private translationService: TranslateService
  ) {
    this.title = (data) ? 'OFFER.Operation.Edit' : 'OFFER.Operation.Create'

    this.snackbarConfig.horizontalPosition = 'center';
    this.snackbarConfig.verticalPosition = 'bottom';
    this.snackbarConfig.duration = 5000;
    this.snackbarConfig.panelClass = ['snack-success'];
  }

  ngOnInit() {
    if (this.data) {
      this.initValues(this.data)
      this.form.markAllAsTouched()
    }
  }

  save() {
    if (this.form.invalid) {
      this.validateForm()
      this.showFormInvalidError()
      return
    }

    this.loading = true;
    if (this.data == null) {
      this.create()
    } else {
      this.update(this.data)
    }
  }

  close() {
    this.dialogRef.close()
  }

  private initValues(offer: Offer) {
    let start = moment(offer.start);
    let end = moment(offer.end);

    this.setValue(start, this.form.get('startTime')!!, this.form.get('date')!!);
    this.setValue(end, this.form.get('endTime')!!, this.form.get('date')!!);

    this.form.get('maxPersons')?.setValue(offer.maxPersons)
    this.form.get('active')?.setValue(offer.active)
  }

  private setValue(date: Moment, timeControl: AbstractControl, dateControl: AbstractControl) {
    let timeVal = date.format("HH:mm");
    let dateVal = date;

    timeControl.setValue(timeVal);
    dateControl.setValue(dateVal);
  }

  private validateForm() {
    this.form.markAllAsTouched()
  }

  private get request(): OfferChangeRequest | null {
    let value = this.form.value as OfferChangeForm
    let date = value.date
    let startTime = value.startTime
    let endTime = value.endTime

    let startDateTime = this.service.createDateTime(startTime, date)?.format("YYYY-MM-DD[T]HH:mm:ss")
    let endDateTime = this.service.createDateTime(endTime, date)?.format("YYYY-MM-DD[T]HH:mm:ss")
    let maxPersons = value.maxPersons
    let active = value.active
    if (!startDateTime || !endDateTime) return null
    return new OfferChangeRequest(
      startDateTime,
      endDateTime,
      maxPersons,
      active
    )
  }

  private create() {
    let request = this.request
    if (!request) {
      this.showFormInvalidError()
    } else {
      this.service.createOffer(request).subscribe((result) => this.handleCreateResult(result))
    }
  }

  private update(offer: Offer) {
    let request = this.request
    if (!request) {
      this.showFormInvalidError()
    } else {
      this.service.updateOffer(offer.id, request).subscribe((result) => this.handleCreateResult(result))
    }
  }

  private showFormInvalidError() {
    this.translationService.get("OFFER.MESSAGE.ERROR.FORM_INVALID").subscribe(
      msg => this.snackBar.open(msg, 'OK', this.snackbarConfig)
        .afterDismissed()
        .subscribe(() => this.dialogRef.close())
    )
  }

  private handleCreateResult(result: Offer) {
    if (result == null) {
      this.translationService.get("OFFER.MESSAGE.ERROR.CREATION_FAILED").subscribe(
        msg => this.snackBar.open(msg, 'OK', this.snackbarConfig)
          .afterDismissed()
          .subscribe(() => this.dialogRef.close())
      )
    } else {
      this.dialogRef.close(result)
    }
  }
}
