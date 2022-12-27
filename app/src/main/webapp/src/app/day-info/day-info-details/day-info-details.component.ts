import {Component, OnInit} from '@angular/core';
import {DayInfoService} from "../model/day-info.service";
import {ActivatedRoute} from "@angular/router";
import {DayInfo} from "../model/day-info-api";
import {OfferService} from "../../offer/model/offer.service";
import {OfferInfo, OfferInfoSelectResultEntry} from "../../offer/model/offer-api";
import {EChartsOption} from "echarts";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-day-info-details',
  templateUrl: './day-info-details.component.html',
  styleUrls: ['./day-info-details.component.scss']
})
export class DayInfoDetailsComponent implements OnInit {

  dayReloading: boolean = false
  offerReloading: boolean = false
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
          this.offerReloading = true
          this.offerService.getOfferInfoDate(date).subscribe(d => this.handleOfferInfo(d))
        }
      }
    )
  }


  private handleDayInfo(d: DayInfo) {
    this.data = d
    this.dayReloading = false
  }

  private handleOfferInfo(d: OfferInfoSelectResultEntry) {
    this.infos = d.infos
    this.spaceChartOption = {
      title: {
        text: this.translate.instant('DAY_INFO.Chart.Space.Title'),
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      animation: false,
      legend: {
        data: [this.translate.instant('DAY_INFO.Chart.Space.Series.Available'), this.translate.instant('DAY_INFO.Chart.Space.Series.Booked'),]
      },
      xAxis: {
        type: 'category',
        data: d.infos.map(i => i.start.substring(11, 16))
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: this.translate.instant('DAY_INFO.Chart.Space.Series.Available'),
          type: 'bar',
          stack: 'total',
          emphasis: {
            focus: 'series'
          },
          data: d.infos.map(i => i.amountOfSpaceAvailable),
          color: "#91cc75"
        }, {
          name: this.translate.instant('DAY_INFO.Chart.Space.Series.Booked'),
          type: 'bar',
          stack: 'total',
          emphasis: {
            focus: 'series'
          },
          data: d.infos.map(i => i.amountOfSpaceBooked),
          color: "#ee6666"
        }
      ]
    };


    this.offerReloading = false
  }

}
