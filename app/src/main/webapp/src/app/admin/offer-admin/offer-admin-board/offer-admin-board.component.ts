import {Component} from '@angular/core';
import {DayInfoService} from "../../../day-info/model/day-info.service";
import {AdminService} from "../../model/admin.service";
import {DayInfo} from "../../../day-info/model/day-info-api";
import {EChartsOption} from "echarts";

@Component({
  selector: 'app-offer-admin-board',
  templateUrl: './offer-admin-board.component.html',
  styleUrls: ['./offer-admin-board.component.scss']
})
export class OfferAdminBoardComponent {
  reloading: boolean = false;

  constructor(public dayInfoService: DayInfoService, public service: AdminService) {
  }

  ngOnInit(): void {
    this.dayInfoService.loadDefaultDayInfo()
  }

  getChartOptions(data: DayInfo): EChartsOption {
    let chart = this.dayInfoService.createDayInfoChart(data)
    chart.legend = undefined
    chart.title = undefined
    chart.xAxis = {type: 'category', show: false}
    chart.yAxis = {type: 'value', show: false}
    return chart
  }
}
