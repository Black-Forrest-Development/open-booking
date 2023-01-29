import {Component, Input} from '@angular/core';
import {BookingRequestInfo, defaultBookingRequestInfo} from "../../request/model/booking-request-api";

@Component({
  selector: 'app-booking-details-bookings',
  templateUrl: './booking-details-bookings.component.html',
  styleUrls: ['./booking-details-bookings.component.scss']
})
export class BookingDetailsBookingsComponent {
  @Input() data: BookingRequestInfo = defaultBookingRequestInfo
}
