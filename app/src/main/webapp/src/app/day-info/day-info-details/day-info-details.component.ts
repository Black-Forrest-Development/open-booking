import {Component, OnInit} from '@angular/core';
import {DayInfoService} from "../model/day-info.service";
import {ActivatedRoute} from "@angular/router";
import {DayInfo} from "../model/day-info-api";
import {OfferService} from "../../offer/model/offer.service";
import {OfferInfo} from "../../offer/model/offer-api";
import {EChartsOption} from "echarts";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-day-info-details',
  templateUrl: './day-info-details.component.html',
  styleUrls: ['./day-info-details.component.scss']
})
export class DayInfoDetailsComponent implements OnInit {

  dayReloading: boolean = false

  data: DayInfo | undefined

  infos: OfferInfo[] = []

  spaceChartOption: EChartsOption = {};

  constructor(private route: ActivatedRoute,
              private service: DayInfoService,
              private offerService: OfferService,
              private translate: TranslateService,
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(value => {
        let date = value.get('id')
        if (date) {
          this.dayReloading = true
          this.service.loadDayInfo(date).subscribe(d => this.handleDayInfo(d))
        }
      }
    )
  }


  private handleDayInfo(d: DayInfo) {
    this.data = d
    this.spaceChartOption = this.service.createDayInfoChart(d)
    this.dayReloading = false
  }

}
