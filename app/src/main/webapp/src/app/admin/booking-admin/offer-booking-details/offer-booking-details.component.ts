import {Component, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {BookingDetailsInfoDialogComponent} from "../booking-details-info-dialog/booking-details-info-dialog.component";
import {VisitorGroup} from 'src/app/visitor-group/model/visitor-group-api';
import {defaultOffer, Offer} from "../../../backoffice/offer/model/offer-api";
import {Booking, BookingDetails} from "../../../backoffice/booking/model/booking-api";
import {BookingService} from "../../../backoffice/booking/model/booking.service";

@Component({
  selector: 'app-offer-booking-details',
  templateUrl: './offer-booking-details.component.html',
  styleUrls: ['./offer-booking-details.component.scss']
})
export class OfferBookingDetailsComponent {
  reloading: boolean = false
  @Input() offer: Offer = defaultOffer
  bookings: BookingDetails[] = []
  data: BookingDetailsEntry[] = []

  constructor(private service: BookingService, private dialog: MatDialog) {
  }

  ngOnInit() {
    if (this.offer) {
      this.reloading = true
      this.service.findBookingDetailsByOffer(this.offer.id).subscribe(d => this.handleData(d))
    }
  }

  private handleData(d: BookingDetails[]) {
    this.bookings = d
    this.data = d.map(b => {
      return {booking: b.booking, visitorGroup: b.visitorGroup, width: this.getWidth(b)}
    })
    this.reloading = false
  }

  showDetails(b: BookingDetails) {
    this.dialog.open(BookingDetailsInfoDialogComponent, {data: b})
  }

  private getWidth(b: BookingDetails): number {
    let totalSize = this.offer.maxPersons
    return Math.abs(b.visitorGroup.size / totalSize * 12)
  }

}

export interface BookingDetailsEntry {
  booking: Booking,
  visitorGroup: VisitorGroup,
  width: number

}
