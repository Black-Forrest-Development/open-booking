import {Injectable} from '@angular/core';
import {BaseService} from "../../shared/base-service";
import {HttpClient} from "@angular/common/http";
import {LoggingService} from "../../shared/logging/logging.service";
import {BehaviorSubject, Observable} from "rxjs";
import {OfferInfoSelectRequest, OfferInfoSelectResult, OfferInfoSelectResultEntry} from "../../offer/model/offer-api";

@Injectable({
  providedIn: 'root'
})
export class BookingService extends BaseService {


  reloading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  offers: OfferInfoSelectResultEntry[] = []

  constructor(http: HttpClient, logging: LoggingService) {
    super(http, 'frontend/user', logging)
  }

  loadOfferInfo(size: number, dates: string[]) {
    if (this.reloading.value) return
    this.reloading.next(true)

    let request = new OfferInfoSelectRequest(size, dates)
    this.getOfferInfo(request).subscribe(d => this.handleData(d))
  }


  private getOfferInfo(request: OfferInfoSelectRequest): Observable<OfferInfoSelectResult> {
    return super.post('offer/info', request)
  }

  private handleData(d: OfferInfoSelectResult) {
    this.offers = d.offers
    this.reloading.next(false)
  }
}
