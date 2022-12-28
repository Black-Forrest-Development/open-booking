import {Component, Input, OnInit} from '@angular/core';
import {DayInfo, defaultDayInfo} from "../model/day-info-api";
import {DayInfoService} from '../model/day-info.service';
import {EChartsOption} from 'echarts';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-day-info-board-entry',
  templateUrl: './day-info-board-entry.component.html',
  styleUrls: ['./day-info-board-entry.component.scss']
})
export class DayInfoBoardEntryComponent implements OnInit {
  @Input()
  data: DayInfo = defaultDayInfo

  selected = false;

  constructor(private service: DayInfoService, private translate: TranslateService) {
  }

  isSelected(): boolean {
    return false
  }

  toggleSelection() {
    this.service.toggleSelection(this.data)
  }

  chartOption: EChartsOption = {};


  ngOnInit() {
    this.chartOption = {
      tooltip: {
        trigger: 'item'
      },
      animation: false,
      xAxis: {
        type: 'category',
        show: false
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [
        {
          name: this.translate.instant('DAY_INFO.Chart.Space.Series.Available'),
          type: 'bar',
          stack: 'total',
          label: {
            show: false
          },
          data: this.data.offer.map(o => o.amountOfSpaceAvailable),
          color: "#91cc75"
        },
        {
          name: this.translate.instant('DAY_INFO.Chart.Space.Series.Confirmed'),
          type: 'bar',
          stack: 'total',
          label: {
            show: false
          },
          data: this.data.offer.map(o => o.amountOfSpaceConfirmed),
          color: "#ee6666"
        }
      ]
    };
  }

}
