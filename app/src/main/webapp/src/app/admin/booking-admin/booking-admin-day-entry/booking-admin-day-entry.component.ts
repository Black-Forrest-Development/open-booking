import {Component, Input} from '@angular/core';
import {defaultOffer, Offer} from "../../offer-admin/model/offer-admin-api";
import {BookingAdminService} from '../model/booking-admin.service';
import {BookingDetails} from "../model/booking-admin-api";
import {MatDialog} from "@angular/material/dialog";
import {BookingDetailsInfoDialogComponent} from "../booking-details-info-dialog/booking-details-info-dialog.component";

@Component({
  selector: 'app-booking-admin-day-entry',
  templateUrl: './booking-admin-day-entry.component.html',
  styleUrls: ['./booking-admin-day-entry.component.scss']
})
export class BookingAdminDayEntryComponent {
  reloading: boolean = false
  @Input() offer: Offer = defaultOffer

  bookings: BookingDetails[] = []

  constructor(private service: BookingAdminService, private dialog: MatDialog) {
  }

  ngOnInit() {
    if (this.offer) {
      this.reloading = true
      this.service.findBookingDetailsByOffer(this.offer.id).subscribe(d => this.handleData(d))
    }
  }

  private handleData(d: BookingDetails[]) {
    this.bookings = d
    this.reloading = false
  }

  showDetails(b: BookingDetails) {
    this.dialog.open(BookingDetailsInfoDialogComponent, {data: b})
  }
}
