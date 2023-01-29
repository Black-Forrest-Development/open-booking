import {Component, Input} from '@angular/core';
import {BookingRequestInfo, defaultBookingRequestInfo} from "../../request/model/booking-request-api";

@Component({
  selector: 'app-booking-details-visitor-group',
  templateUrl: './booking-details-visitor-group.component.html',
  styleUrls: ['./booking-details-visitor-group.component.scss']
})
export class BookingDetailsVisitorGroupComponent {
  @Input() data: BookingRequestInfo = defaultBookingRequestInfo
}
