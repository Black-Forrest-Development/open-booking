import {Injectable} from '@angular/core';
import {BaseService} from "../../shared/base-service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {LoggingService} from "../../shared/logging/logging.service";
import {Observable} from "rxjs";
import {DayInfoOffer} from "../../offer/model/offer-api";
import {CreateBookingRequest} from "../../booking/model/booking-api";
import {BookingRequest} from "../../admin/request-admin/model/request-admin-api";
import {ResolvedResponse} from "../../backoffice/response/model/response-api";
import {UrlResponse} from "./home-api";
import {GenericRequestResult} from "../../shared/shared-api";

@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseService {
  constructor(http: HttpClient, logging: LoggingService) {
    super(http, 'frontend/user', logging)
    this.retryCount = 1
  }


  getOffer(offerId: number): Observable<DayInfoOffer> {
    return this.get('offer/' + offerId)
  }

  createBooking(request: CreateBookingRequest): Observable<BookingRequest> {
    return super.post('booking', request)
  }

  getRequestReceivedMessage(requestId: number, lang: string): Observable<ResolvedResponse> {
    let queryParams = new HttpParams()
    queryParams = queryParams.append("lang",lang)
    return this.get('request/' + requestId + '/received/message', queryParams)
  }

  getHelpUrl(): Observable<UrlResponse> {
    return this.get('setting/help')
  }

  getTermsAndConditionsUrl(): Observable<UrlResponse> {
    return this.get('setting/terms-and-conditions')
  }

  confirmEmail(key: string): Observable<GenericRequestResult> {
    return this.post('confirm/email/' + key, {})
  }
}
