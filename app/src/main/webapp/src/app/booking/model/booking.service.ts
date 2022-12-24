import {Injectable} from '@angular/core';
import {BaseService} from "../../shared/base-service";
import {HttpClient} from "@angular/common/http";
import {LoggingService} from "../../shared/logging/logging.service";
import {Observable} from "rxjs";
import {OfferInfoSelectRequest, OfferInfoSelectResult} from "../../offer/model/offer-api";

@Injectable({
  providedIn: 'root'
})
export class BookingService extends BaseService {

  constructor(http: HttpClient, logging: LoggingService) {
    super(http, 'frontend/user', logging)
  }

  private getOfferInfo(request: OfferInfoSelectRequest): Observable<OfferInfoSelectResult> {
    return super.post('offer/info', request)
  }
}
