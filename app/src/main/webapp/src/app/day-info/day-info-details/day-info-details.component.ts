import {Component, OnInit} from '@angular/core';
import {DayInfoService} from "../model/day-info.service";
import {ActivatedRoute} from "@angular/router";
import {DayInfo} from "../model/day-info-api";
import {OfferService} from "../../offer/model/offer.service";
import {EChartsOption} from "echarts";
import {TranslateService} from "@ngx-translate/core";
import {Location} from "@angular/common";

@Component({
  selector: 'app-day-info-details',
  templateUrl: './day-info-details.component.html',
  styleUrls: ['./day-info-details.component.scss']
})
export class DayInfoDetailsComponent implements OnInit {

  dayReloading: boolean = false

  data: DayInfo | undefined

  spaceChartOption: EChartsOption = {};

  constructor(private route: ActivatedRoute,
              private service: DayInfoService,
              private location: Location,
              private offerService: OfferService,
              private translate: TranslateService,
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(value => {
        let date = value.get('date')
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

  onChartClick($event: any) {
    let index = $event.dataIndex as number | undefined
    if (!index) return

    if (!this.data) return
    let info = this.data.offer[index]
    if (!info) return
    this.service.selectionAddDayInfoOffer(this.data, info)
  }


  back() {
    this.location.back()
  }
}
