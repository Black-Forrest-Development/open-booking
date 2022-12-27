import {Injectable} from '@angular/core';
import {BaseService} from "../../shared/base-service";
import {HttpClient} from "@angular/common/http";
import {LoggingService} from "../../shared/logging/logging.service";
import {BehaviorSubject, Observable} from "rxjs";
import {OfferInfoSelectRequest, OfferInfoSelectResult, OfferInfoSelectResultEntry} from "../../offer/model/offer-api";
import {BookingRequest, CreateBookingRequest} from "./booking-api";
import {OfferService} from "../../offer/model/offer.service";

@Injectable({
  providedIn: 'root'
})
export class BookingService extends BaseService {


  reloading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  offers: OfferInfoSelectResultEntry[] = []

  constructor(http: HttpClient, logging: LoggingService, private offerService: OfferService) {
    super(http, 'frontend/user', logging)
    this.retryCount = 1
  }


  loadOfferInfo(size: number, dates: string[]) {
    if (this.reloading.value) return
    this.reloading.next(true)

    let request = new OfferInfoSelectRequest(size, dates)
    this.offerService.getOfferInfo(request).subscribe(d => this.handleData(d))
  }

  createBooking(request: CreateBookingRequest): Observable<BookingRequest> {
    return super.post('booking', request)
  }


  private handleData(d: OfferInfoSelectResult) {
    this.offers = d.offers
    this.reloading.next(false)
  }
}
