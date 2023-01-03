import {Injectable} from '@angular/core';
import {BaseService} from "../../../shared/base-service";
import {HttpClient} from "@angular/common/http";
import {LoggingService} from "../../../shared/logging/logging.service";
import {Observable} from "rxjs";
import {Page} from "../../../shared/page/page";
import {BookingRequest, BookingRequestChangeRequest, BookingRequestChangeResult, BookingRequestInfo} from "./request-admin-api";


@Injectable({
  providedIn: 'root'
})
export class RequestAdminService extends BaseService {

  constructor(http: HttpClient, logging: LoggingService) {
    super(http, 'backend/request', logging)
  }

  getAllBookingRequest(page: number, size: number): Observable<Page<BookingRequest>> {
    return this.getPaged('', page, size)
  }

  getAllBookingRequestInfoUnconfirmed(page: number, size: number): Observable<Page<BookingRequestInfo>> {
    return this.getPaged('unconfirmed/info', page, size)
  }

  getBookingRequest(id: number): Observable<BookingRequest> {
    return this.get('' + id)
  }

  createBookingRequest(request: BookingRequestChangeRequest): Observable<BookingRequest> {
    return this.post('', request)
  }

  updateBookingRequest(id: number, request: BookingRequestChangeRequest): Observable<BookingRequest> {
    return this.put('' + id, request)
  }

  deleteBookingRequest(id: number): Observable<BookingRequest> {
    return this.delete('' + id)
  }

  confirmBookingRequest(id: number, bookingId: number): Observable<BookingRequestChangeResult> {
    return this.put('' + id + '/confirm/' + bookingId, {})
  }

  denialBookingRequest(id: number): Observable<BookingRequestChangeResult> {
    return this.put('' + id + '/denial', {})
  }

}
