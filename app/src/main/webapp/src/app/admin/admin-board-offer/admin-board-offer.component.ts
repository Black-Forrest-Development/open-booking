import {Component, OnInit} from '@angular/core';
import {DayInfoService} from "../../day-info/model/day-info.service";
import {DayInfo} from "../../day-info/model/day-info-api";
import {EChartsOption} from "echarts";
import {AdminService} from "../model/admin.service";

@Component({
  selector: 'app-admin-board-offer',
  templateUrl: './admin-board-offer.component.html',
  styleUrls: ['./admin-board-offer.component.scss']
})
export class AdminBoardOfferComponent implements OnInit {

  reloading: boolean = false;

  constructor(public dayInfoService: DayInfoService, public service: AdminService) {
  }

  ngOnInit(): void {
    this.dayInfoService.loadDefaultDayInfo()
  }

  getChartOptions(data: DayInfo): EChartsOption {
    let chart =  this.dayInfoService.createDayInfoChart(data)
    chart.legend = undefined
    chart.title = undefined
    chart.xAxis = {type: 'category', show: false}
    chart.yAxis = {type: 'value', show: false}
    return chart
  }
}
