import {Component, EventEmitter} from '@angular/core';
import {Offer} from "../../offer/model/offer-api";
import {DayInfoService} from "../../../day-info/model/day-info.service";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-booking-board',
  templateUrl: './booking-board.component.html',
  styleUrls: ['./booking-board.component.scss']
})
export class BookingBoardComponent {

  keyUp: EventEmitter<string> = new EventEmitter<string>()

  constructor(public dayInfoService: DayInfoService,private toast: HotToastService) {
  }

  ngOnInit(): void {
    this.dayInfoService.loadDefaultDayInfo()
  }

  create() {
    this.toast.error('Oh no BOOKING CREATE is not implemented yet');
  }

}
