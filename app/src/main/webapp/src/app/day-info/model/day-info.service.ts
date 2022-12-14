import {Injectable} from '@angular/core';
import {BaseService} from "../../shared/base-service";
import {HttpClient} from "@angular/common/http";
import {LoggingService} from "../../shared/logging/logging.service";
import {BehaviorSubject, Observable} from "rxjs";
import {DateRangeSelectionRequest, DayInfo} from "./day-info-api";

@Injectable({
  providedIn: 'root'
})
export class DayInfoService extends BaseService {

  constructor(http: HttpClient, logging: LoggingService) {
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
}
