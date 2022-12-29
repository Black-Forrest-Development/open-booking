import {Component} from '@angular/core';
import {MatChipListboxChange} from '@angular/material/chips';
import {DayInfoService} from "../model/day-info.service";
import {DayInfo} from "../model/day-info-api";
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-day-info-booking-selection',
  templateUrl: './day-info-booking-selection.component.html',
  styleUrls: ['./day-info-booking-selection.component.scss']
})
export class DayInfoBookingSelectionComponent {

  constructor(public service: DayInfoService, private router: Router, private route: ActivatedRoute) {
  }

  handleSelectionChange(event: MatChipListboxChange) {
    this.service.primarySelected = event.value as DayInfo
  }

  createBooking() {
    this.router.navigate(['/booking/create', {primary: this.service.primarySelected?.date, selected: this.service.selected.map(d => d.date)}]).then( )
  }
}
