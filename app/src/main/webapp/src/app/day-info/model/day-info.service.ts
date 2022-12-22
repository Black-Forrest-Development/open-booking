import {Injectable} from '@angular/core';
import {BaseService} from "../../shared/base-service";
import {HttpClient} from "@angular/common/http";
import {LoggingService} from "../../shared/logging/logging.service";
import {BehaviorSubject, Observable} from "rxjs";
import {DayInfo, DayInfoSelectRequest} from "./day-info-api";

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

  private selectDayInfo(request: DayInfoSelectRequest): Observable<DayInfo[]> {
    return super.post('day/info', request)
  }

  loadDefaultDayInfo() {
    this.reloading.next(true)
    this.getDefaultDayInfo().subscribe(d => this.handleData(d))
  }

  loadRangeDayInfo(start: Date, end: Date) {
    this.reloading.next(true)
    this.selectDayInfo(new DayInfoSelectRequest(start.toISOString(), end.toISOString())).subscribe(d => this.handleData(d))
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
