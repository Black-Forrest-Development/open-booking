import {Injectable} from '@angular/core';
import {BaseService} from "../../../shared/base-service";
import {HttpClient} from "@angular/common/http";
import {LoggingService} from "../../../shared/logging/logging.service";
import {Observable} from "rxjs";
import {Page} from "../../../shared/page/page";
import {BookingConfirmationContent, BookingRequest, BookingRequestChangeRequest, BookingRequestInfo} from "./booking-request-api";
import {GenericRequestResult} from "../../../shared/shared-api";
import {ResolvedResponse} from "../../response/model/response-api";

@Injectable({
  providedIn: 'root'
})
export class BookingRequestService extends BaseService {

  constructor(http: HttpClient, logging: LoggingService) {
    super(http, 'backend/request', logging)
  }

  getAllBookingRequest(page: number, size: number): Observable<Page<BookingRequest>> {
    return this.getPaged('', page, size)
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

  getAllBookingRequestInfoUnconfirmed(page: number, size: number): Observable<Page<BookingRequestInfo>> {
    return this.getPaged('unconfirmed/info', page, size)
  }

  getConfirmationMessage(id: number, bookingId: number): Observable<ResolvedResponse> {
    return this.get('' + id + '/confirm/' + bookingId + '/message')
  }

  confirmBookingRequest(id: number, bookingId: number, content: BookingConfirmationContent): Observable<GenericRequestResult> {
    return this.put('' + id + '/confirm/' + bookingId, content)
  }

  getDenialMessage(id: number): Observable<ResolvedResponse> {
    return this.get('' + id + '/deny/message')
  }

  denyBookingRequest(id: number, content: BookingConfirmationContent): Observable<GenericRequestResult> {
    return this.put('' + id + '/deny', content)
  }

}
