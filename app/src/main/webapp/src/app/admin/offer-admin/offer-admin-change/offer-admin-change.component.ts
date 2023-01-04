import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {Location} from "@angular/common";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute, Router} from "@angular/router";
import * as moment from "moment/moment";
import {Moment} from "moment/moment";
import {OfferAdminService} from "../model/offer-admin.service";
import {Offer, OfferChangeRequest} from "../model/offer-admin-api";

@Component({
  selector: 'app-offer-admin-change',
  templateUrl: './offer-admin-change.component.html',
  styleUrls: ['./offer-admin-change.component.scss']
})
export class OfferAdminChangeComponent implements OnInit {

  title: string = "OFFER.MENU.Add";
  reloading: boolean = false

  data: Offer | null = null

  form: FormGroup = this.fb.group({
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      maxPersons: ['', Validators.required],
      active: ['', Validators.required],
    }
  )
  private snackbarConfig = new MatSnackBarConfig()

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private service: OfferAdminService,
    private snackBar: MatSnackBar,
    private translationService: TranslateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.snackbarConfig.horizontalPosition = 'center';
    this.snackbarConfig.verticalPosition = 'bottom';
    this.snackbarConfig.duration = 5000;
    this.snackbarConfig.panelClass = ['snack-success'];
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadData(+id, (e) => this.handleDataEdit(e))
    } else {
      this.handleDataCreate()
    }
  }

  private loadData(offerId: number, callback: (e: Offer) => void) {
    this.reloading = true;
    this.service.getOffer(offerId).subscribe(data => callback(data));
  }

  private handleDataCreate() {
    console.log("Handle data create");
    this.data = null;
    this.translationService.get("OFFER.CHANGE.Create").subscribe(text => this.title = text);
  }

  private handleDataEdit(data: Offer) {
    console.log("Handle data edit " + data.id);
    this.data = data;
    this.initValues(data);
    this.translationService.get("OFFER.CHANGE.Update", {offer: data.id}).subscribe(text => this.title = text);
    this.validateForm();
    this.reloading = false;
  }

  private initValues(data: Offer) {

    let start = moment(data.start);
    let end = moment(data.end);

    this.setValue(start, this.form.get('startTime')!!, this.form.get('date')!!);
    this.setValue(end, this.form.get('endTime')!!, this.form.get('date')!!);

    this.form.get('maxPersons')?.setValue(data.maxPersons)
    this.form.get('active')?.setValue(data.active)
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

  onSubmit() {
    if (this.form.invalid) {
      console.error("Cannot submit form, cause its invalid.")
      this.validateForm()
      this.showFormInvalidError()
      return
    }

    this.reloading = true;
    if (this.data == null) {
      this.create()
    } else {
      this.update(this.data)
    }
  }

  cancel() {
    this.location.back()
  }

  private get request(): OfferChangeRequest | null {
    let startDateTime = this.createDateTime(this.form.get('startTime')?.value, this.form.get('date')?.value)?.format("YYYY-MM-DD[T]HH:mm:ss")
    let endDateTime = this.createDateTime(this.form.get('endTime')?.value, this.form.get('date')?.value)?.format("YYYY-MM-DD[T]HH:mm:ss")
    let maxPersons = this.form.get('maxPersons')?.value
    let active = this.form.get('active')?.value
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

  private showFormInvalidError() {
    this.translationService.get("OFFER.MESSAGE.ERROR.FORM_INVALID").subscribe(
      msg => this.snackBar.open(msg, 'OK', this.snackbarConfig).afterDismissed()
    )
  }

  private createDateTime(timeStr: string, date: any): Moment | null {
    let mDate = moment(date)
    let time = timeStr.split(":");
    if (time.length == 2 && mDate.isValid()) {
      mDate.hours(parseInt(time[0]));
      mDate.minutes(parseInt(time[1]));
      return mDate
    }
    return null;
  }

  private update(offer: Offer) {
    let request = this.request
    if (!request) {
      this.showFormInvalidError()
    } else {
      this.service.updateOffer(offer.id, request).subscribe((result) => this.handleCreateResult(result))
    }
  }

  private handleCreateResult(result: Offer) {
    if (result == null) {
      this.translationService.get("OFFER.MESSAGE.ERROR.CREATION_FAILED").subscribe(
        msg => this.snackBar.open(msg, 'OK', this.snackbarConfig)
          .afterDismissed()
      )
    } else {
      this.translationService.get("OFFER.MESSAGE.INFO.CREATION_SUCCEED").subscribe(
        msg => this.snackBar.open(msg, 'OK', this.snackbarConfig)
          .afterDismissed()
          .subscribe(() => this.router.navigate(["/admin/offer/details/" + result.id]))
      )
    }
  }
}
