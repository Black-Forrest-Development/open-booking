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
    this.reloading.next(false)
  }
}
