import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {HomeServiceService} from "../model/home-service.service";
import {DayInfoHelper, DayInfoOffer} from "../../offer/model/offer-api";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import {Address, VisitorGroupChangeRequest} from "../../visitor-group/model/visitor-group-api";
import {CreateBookingRequest} from "../../booking/model/booking-api";
import {BookingRequest} from "../../admin/request-admin/model/request-admin-api";
import {MatDialog} from '@angular/material/dialog';
import {CreateBookingConfirmationDialogComponent} from "../create-booking-confirmation-dialog/create-booking-confirmation-dialog.component";
import {Location} from "@angular/common";

@Component({
  selector: 'app-create-booking-request',
  templateUrl: './create-booking-request.component.html',
  styleUrls: ['./create-booking-request.component.scss'],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ]
})
export class CreateBookingRequestComponent {

  reloading = false
  offer: DayInfoOffer | undefined = undefined

  formGroup = this.fb.group({
    title: ['Default Title', Validators.required],
    size: ['20', Validators.required],
    group: [false],
    minAge: ['1', Validators.required],
    maxAge: ['99', Validators.required],
    contact: ['Contact', Validators.required],
    street: ['Street', Validators.required],
    zip: ['987654', Validators.required],
    city: ['City', Validators.required],
    phone: ['012456789'],
    mail: ['test@mailtest.com', Validators.required],
    termsAndConditions: [false, Validators.requiredTrue],
    comment: [''],
  });


  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private service: HomeServiceService,
              private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(value => {
        let id = value.get('id')
        if (id) {
          this.reloading = true
          this.service.getOffer(+id).subscribe(d => this.handleOffer(d))
        }
      }
    )
  }

  back() {
    this.location.back()
  }

  private handleOffer(d: DayInfoOffer) {
    this.offer = d
    let size = this.formGroup.get('size')
    if (size) {
      let value = +(size.value ?? "0")
      let spaceAvailable = DayInfoHelper.getSpaceAvailable(d);
      if (value > spaceAvailable) {
        size.setValue(spaceAvailable + '')
      }
      size.setValidators([Validators.required, Validators.min(1), Validators.max(spaceAvailable)])
    }
    this.reloading = false
  }


  submit() {
    if (this.formGroup.invalid) return
    let value = this.formGroup.value

    let visitorGroupRequest = new VisitorGroupChangeRequest(
      value.title!!,
      +value.size!!,
      +value.minAge!!,
      +value.maxAge!!,
      value.contact!!,
      new Address(value.street!!, value.city!!, value.zip!!),
      value.phone!!,
      value.mail!!
    )

    let offer = this.offer?.offer
    if (!offer) return
    let offerIds: number[] = [offer.id]

    let request = new CreateBookingRequest(
      visitorGroupRequest,
      offerIds,
      value.comment!!,
      value.termsAndConditions!!
    )
    this.service.createBooking(request).subscribe(d => this.handleResult(request, d))
  }

  private handleResult(request: CreateBookingRequest, d: BookingRequest) {
    let dialogRef = this.dialog.open(CreateBookingConfirmationDialogComponent, {data: request})
    dialogRef.afterClosed().subscribe(() => this.router.navigate(['']))
  }
}
