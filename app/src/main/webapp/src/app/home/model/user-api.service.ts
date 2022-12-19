import {Injectable} from '@angular/core';
import {LoggingService} from "../../shared/logging/logging.service";
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../shared/base-service";
import {Observable} from "rxjs";
import {DayInfo} from "./user-api";

@Injectable({
  providedIn: 'root'
})
export class UserApiService extends BaseService {

  constructor(http: HttpClient, logging: LoggingService) {
    super(http, 'frontend/user', logging)
  }


  getDefaultDayInfo(): Observable<Array<DayInfo>> {
    return super.get('day/info')
  }



}
