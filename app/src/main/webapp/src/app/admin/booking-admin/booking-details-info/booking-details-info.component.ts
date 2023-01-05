import {Component, Input} from '@angular/core';
import {BookingDetails, defaultBookingDetails} from "../model/booking-admin-api";

@Component({
  selector: 'app-booking-details-info',
  templateUrl: './booking-details-info.component.html',
  styleUrls: ['./booking-details-info.component.scss']
})
export class BookingDetailsInfoComponent {

  @Input() data: BookingDetails = defaultBookingDetails

}