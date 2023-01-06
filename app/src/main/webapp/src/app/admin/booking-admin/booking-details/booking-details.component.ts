import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {BookingAdminService} from "../model/booking-admin.service";

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent {
  reloading: boolean = false

  constructor(
    private route: ActivatedRoute,
    private service: BookingAdminService,
    private location: Location
  ) {
  }

  back() {
    this.location.back()
  }
}
