import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {BaseService} from "../../../shared/base-service";
import {LoggingService} from "../../../shared/logging/logging.service";
import {Page} from "../../../shared/page/page";
import {Offer, OfferChangeRequest, OfferSeriesRequest} from "./offer-admin-api";
import {GenericRequestResult} from "../../../shared/shared-api";
import {Moment} from "moment/moment";
import * as moment from "moment/moment";

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

  createOfferSeries(request: OfferSeriesRequest): Observable<GenericRequestResult> {
    return this.post('series', request)
  }
  createDateTime(timeStr: string, date: any): Moment | null {
    let mDate = moment(date)
    let time = timeStr.split(":");
    if (time.length == 2 && mDate.isValid()) {
      mDate.hours(parseInt(time[0]));
      mDate.minutes(parseInt(time[1]));
      return mDate
    }
    return null;
  }
}
