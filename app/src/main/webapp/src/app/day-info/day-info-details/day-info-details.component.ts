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


    this.spaceChartOption = {
      title: {
        text: this.translate.instant('DAY_INFO.Chart.Space.Title'),
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      animation: false,
      legend: {
        data: [
          this.translate.instant('DAY_INFO.Chart.Space.Series.Available'),
          this.translate.instant('DAY_INFO.Chart.Space.Series.Confirmed'),
          this.translate.instant('DAY_INFO.Chart.Space.Series.Unconfirmed'),
        ],
        bottom: 10,
        left: 'center',
      },
      xAxis: {
        type: 'category',
        data: d.offer.map(i => i.offer.start.substring(11, 16))
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
          data: d.offer.map(i => i.amountOfSpaceTotal - i.amountOfSpaceConfirmed - i.amountOfSpaceUnconfirmed),
          color: "#91cc75"
        }, {
          name: this.translate.instant('DAY_INFO.Chart.Space.Series.Confirmed'),
          type: 'bar',
          stack: 'total',
          emphasis: {
            focus: 'series'
          },
          data: d.offer.map(i => i.amountOfSpaceConfirmed),
          color: "#ee6666"
        }, {
          name: this.translate.instant('DAY_INFO.Chart.Space.Series.Unconfirmed'),
          type: 'bar',
          stack: 'total',
          emphasis: {
            focus: 'series'
          },
          data: d.offer.map(i => i.amountOfSpaceUnconfirmed),
          color: "#fac858"
        }
      ]
    };
    this.dayReloading = false
  }

}
