import {Injectable} from '@angular/core';
import {BaseService} from "../../shared/base-service";
import {HttpClient} from "@angular/common/http";
import {LoggingService} from "../../shared/logging/logging.service";
import {BehaviorSubject, Observable} from "rxjs";
import {DateRangeSelectionRequest, DayInfo} from "./day-info-api";
import {EChartsOption} from "echarts";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class DayInfoService extends BaseService {

  constructor(http: HttpClient, logging: LoggingService, private translate: TranslateService) {
    super(http, 'frontend/user', logging)
  }

  reloading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  data: DayInfo[] = []


  private getDefaultDayInfo(): Observable<DayInfo[]> {
    return super.get('day/info')
  }

  private selectDayInfo(request: DateRangeSelectionRequest): Observable<DayInfo[]> {
    return super.post('day/info', request)
  }

  loadDayInfo(date: string): Observable<DayInfo> {
    return super.get('day/info/' + date)
  }

  loadDefaultDayInfo() {
    if (this.reloading.value) return
    this.reloading.next(true)
    this.getDefaultDayInfo().subscribe(d => this.handleData(d))
  }

  loadRangeDayInfo(start: Date, end: Date) {
    if (this.reloading.value) return
    this.reloading.next(true)
    this.selectDayInfo(new DateRangeSelectionRequest(start.toISOString(), end.toISOString())).subscribe(d => this.handleData(d))
  }


  private handleData(d: DayInfo[]) {
    this.data = d
    this.selected = []
    this.reloading.next(false)
  }

  selected: DayInfo[] = []
  primarySelected: DayInfo | null = null

  toggleSelection(data: DayInfo) {
    let index = this.selected.indexOf(data)
    if (index < 0) {
      this.selected.push(data)
      if (!this.primarySelected) this.primarySelected = data
    } else {
      this.selected.splice(index, 1);
      if (this.selected.length == 0) {
        this.primarySelected = null
      } else if (this.primarySelected == data) {
        this.primarySelected = this.selected[0]
      }
    }
  }

  createDayInfoChart(info: DayInfo): EChartsOption {
    return {
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
          this.translate.instant('DAY_INFO.Chart.Space.Series.Deactivated'),
        ],
        bottom: 10,
        left: 'center',
      },
      xAxis: {
        type: 'category',
        data: info.offer.map(i => i.offer.start.substring(11, 16))
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
          data: info.offer.map(i => (i.offer.active) ?i.offer.maxPersons - i.space.CONFIRMED - i.space.UNCONFIRMED : 0),
          color: "#91cc75"
        }, {
          name: this.translate.instant('DAY_INFO.Chart.Space.Series.Confirmed'),
          type: 'bar',
          stack: 'total',
          emphasis: {
            focus: 'series'
          },
          data: info.offer.map(i => (i.offer.active) ? i.space.CONFIRMED : 0),
          color: "#ee6666"
        }, {
          name: this.translate.instant('DAY_INFO.Chart.Space.Series.Unconfirmed'),
          type: 'bar',
          stack: 'total',
          emphasis: {
            focus: 'series'
          },
          data: info.offer.map(i => (i.offer.active) ? i.space.UNCONFIRMED : 0),
          color: "#fac858"
        }, {
          name: this.translate.instant('DAY_INFO.Chart.Space.Series.Deactivated'),
          type: 'bar',
          stack: 'total',
          emphasis: {
            focus: 'series'
          },
          data: info.offer.map(i => (!i.offer.active) ? i.offer.maxPersons : 0),
          color: "lightgrey"
        }
      ]
    }
  }

}
