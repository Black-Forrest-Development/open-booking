import {Injectable} from '@angular/core';
import {BaseService} from "../../shared/base-service";
import {HttpClient} from "@angular/common/http";
import {LoggingService} from "../../shared/logging/logging.service";
import {Observable} from 'rxjs';
import {Page} from "../../shared/page/page";
import {Offer, OfferChangeRequest} from "../../offer/model/offer-api";

@Injectable({
  providedIn: 'root'
})
export class OfferAdminService extends BaseService {

  constructor(http: HttpClient, logging: LoggingService) {
    super(http, 'backend/offer', logging)
  }

  getAllOffer(page: number, size: number): Observable<Page<Offer>> {
    return this.getPaged('', page, size)
  }

  getOffer(id: number): Observable<Offer> {
    return this.get('' + id)
  }

  createOffer(request: OfferChangeRequest): Observable<Offer> {
    return this.post('', request)
  }

  updateOffer(id: number, request: OfferChangeRequest): Observable<Offer> {
    return this.put('' + id, request)
  }

  deleteOffer(id: number): Observable<Offer> {
    return this.delete('' + id)
  }

  findOfferByDate(date: string): Observable<Offer[]> {
    return this.get('find/' + date)
  }

  setActive(id: number, active: boolean): Observable<Offer> {
    return this.patch('' + id + '/active', {value: active})
  }

  setMaxPersons(id: number, maxPersons: number): Observable<Offer> {
    return this.patch('' + id + '/max_persons', {value: maxPersons})
  }
}
