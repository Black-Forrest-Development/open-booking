import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {StepperSelectionEvent} from "@angular/cdk/stepper";
import {BookingService} from "../model/booking.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Address, VisitorGroupChangeRequest} from "../../visitor-group/model/visitor-group-api";
import {BookingRequest, CreateBookingRequest} from "../model/booking-api";
import {TranslateService} from "@ngx-translate/core";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-booking-create',
  templateUrl: './booking-create.component.html',
  styleUrls: ['./booking-create.component.scss']
})
export class BookingCreateComponent implements OnInit {


  visitorFormGroup = this.fb.group({
    title: ['Title', Validators.required],
    size: ['20', Validators.required],
    minAge: ['1', Validators.required],
    maxAge: ['99', Validators.required],
    contact: ['Contact', Validators.required],
    street: ['Street', Validators.required],
    zip: ['Zip', Validators.required],
    city: ['City', Validators.required],
    phone: ['Phone', Validators.required],
    mail: ['Mail', Validators.required],
  });


  offerFormGroup = this.fb.group({
    selected: [[], Validators.required],
  });

  finalizeFormGroup = this.fb.group({
    termsAndConditions: [false, Validators.required],
    comment: [''],
  });

  private dates: string[] = []

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private service: BookingService, private translationService: TranslateService,
              private snackBar: MatSnackBar, private router: Router) {

  }

  ngOnInit() {
    let snapshot = this.route.snapshot
    let primary = snapshot.paramMap.get("primary")
    if (primary) this.dates.push(primary)
    let selected = snapshot.paramMap.get("selected")
    if (selected) {
      let data = selected.split(",").filter(s => s != primary)
      this.dates.push(...data)
    }
  }

  handleStepperSelectionChanged(event: StepperSelectionEvent) {
    if (event.selectedIndex != 1) return
    let size = this.visitorFormGroup.get('size')?.value
    if (size == null) return
    this.service.loadOfferInfo(+size, this.dates)
  }

  submit() {
    if (this.visitorFormGroup.invalid) return
    if (this.offerFormGroup.invalid) return

    let visitorFormValue = this.visitorFormGroup.value
    let visitorGroupRequest = new VisitorGroupChangeRequest(
      visitorFormValue.title!!,
      +visitorFormValue.size!!,
      +visitorFormValue.minAge!!,
      +visitorFormValue.maxAge!!,
      visitorFormValue.contact!!,
      new Address(visitorFormValue.street!!, visitorFormValue.city!!, visitorFormValue.zip!!),
      visitorFormValue.phone!!,
      visitorFormValue.mail!!
    )

    let offerIds: number[] = this.offerFormGroup.value.selected!!

    let finalizeFormValue = this.finalizeFormGroup.value

    let request = new CreateBookingRequest(
      visitorGroupRequest,
      offerIds,
      finalizeFormValue.comment!!,
      finalizeFormValue.termsAndConditions!!
    )
    this.service.createBooking(request).subscribe(d => this.handleResult(d))
  }

  private snackbarConfig = new MatSnackBarConfig();

  private handleResult(result: BookingRequest) {
    if (result == null) {
      this.translationService.get("BOOKING.MESSAGE.ERROR.CREATION_FAILED").subscribe(
        msg => this.snackBar.open(msg, 'OK', this.snackbarConfig)
          .afterDismissed()
      )
    } else {
      this.translationService.get("BOOKING.MESSAGE.INFO.CREATION_SUCCEED").subscribe(
        msg => this.snackBar.open(msg, 'OK', this.snackbarConfig)
          .afterDismissed()
          .subscribe(() => this.router.navigate(["/"]))
      )
    }
  }
}
