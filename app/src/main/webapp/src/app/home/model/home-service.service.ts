import {Injectable} from '@angular/core';
import {BaseService} from "../../shared/base-service";
import {HttpClient} from "@angular/common/http";
import {LoggingService} from "../../shared/logging/logging.service";
import {Observable} from "rxjs";
import {DayInfoOffer} from "../../offer/model/offer-api";
import {CreateBookingRequest} from "../../booking/model/booking-api";
import {BookingRequest} from "../../admin/request-admin/model/request-admin-api";

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService extends BaseService {
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

}
