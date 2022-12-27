import {Injectable} from '@angular/core';
import {BaseService} from "../../shared/base-service";
import {HttpClient} from "@angular/common/http";
import {LoggingService} from "../../shared/logging/logging.service";
import {OfferInfoSelectRequest, OfferInfoSelectResult, OfferInfoSelectResultEntry} from "./offer-api";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OfferService extends BaseService {

  constructor(http: HttpClient, logging: LoggingService) {
    super(http, 'frontend/user', logging)
  }


  getOfferInfo(request: OfferInfoSelectRequest): Observable<OfferInfoSelectResult> {
    return super.post('offer/info', request)
  }

  getOfferInfoDate(date: string): Observable<OfferInfoSelectResultEntry> {
    return super.get('offer/info/' + date)
  }
}
