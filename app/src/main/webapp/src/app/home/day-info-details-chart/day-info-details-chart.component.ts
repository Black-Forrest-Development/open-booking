import {Component, Input} from '@angular/core';
import {DayInfo, defaultDayInfo} from "../../day-info/model/day-info-api";
import {Router} from "@angular/router";
import {DayInfoService} from "../../day-info/model/day-info.service";
import {EChartsOption} from "echarts";

@Component({
  selector: 'app-day-info-details-chart',
  templateUrl: './day-info-details-chart.component.html',
  styleUrls: ['./day-info-details-chart.component.scss']
})
export class DayInfoDetailsChartComponent {

  @Input() set data(value: DayInfo) {
    this.spaceChartOption = this.service.createDayInfoChart(value)
    this._data = value
  }

  get data(): DayInfo {
    return this._data
  }

  private _data: DayInfo = defaultDayInfo


  spaceChartOption: EChartsOption = {};

  constructor(
    private service: DayInfoService,
    private router: Router
  ) {
  }


  onChartClick($event: any) {
    let index = $event.dataIndex as number | undefined
    if (!index) return

    if (!this.data) return
    let info = this.data.offer[index]
    if (!info) return
    this.router.navigate(['home', 'booking', info.offer.id]).then()
  }


}
