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
    let chart = this.service.createDayInfoChart(this.data)
    chart.legend = undefined
    chart.title = undefined
    chart.xAxis = {type: 'category', show: false}
    chart.yAxis = {type: 'value', show: false}
    this.chartOption = chart

  }

}
