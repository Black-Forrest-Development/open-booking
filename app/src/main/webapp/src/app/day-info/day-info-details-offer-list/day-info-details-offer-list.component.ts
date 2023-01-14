import {Component, Input} from '@angular/core';
import {DayInfoHelper, DayInfoOffer} from "../../offer/model/offer-api";
import {DayInfoService} from "../model/day-info.service";
import {DayInfo, defaultDayInfo} from "../model/day-info-api";

@Component({
  selector: 'app-day-info-details-offer-list',
  templateUrl: './day-info-details-offer-list.component.html',
  styleUrls: ['./day-info-details-offer-list.component.scss']
})
export class DayInfoDetailsOfferListComponent {

  @Input()  data: DayInfo  = defaultDayInfo

  constructor() {

  }

  ngOnInit() {

  }

}
