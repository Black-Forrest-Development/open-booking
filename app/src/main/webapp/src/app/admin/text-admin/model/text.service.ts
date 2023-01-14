import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/base-service";
import {HttpClient} from "@angular/common/http";
import {LoggingService} from "../../../shared/logging/logging.service";
import {Observable} from "rxjs";
import {Page} from "../../../shared/page/page";
import {Offer, OfferChangeRequest} from "../../offer-admin/model/offer-admin-api";
import {TextChangeRequest, TextDefinition} from "./text-api";

@Injectable({
  providedIn: 'root'
})
export class TextService extends BaseService {

  constructor(http: HttpClient, logging: LoggingService) {
    super(http, 'backend/text', logging)
  }

  getAllTexts(page: number, size: number): Observable<Page<TextDefinition>> {
    return this.getPaged('', page, size)
  }

  getText(id: number): Observable<TextDefinition> {
    return this.get('' + id)
  }

  createText(request: TextChangeRequest): Observable<TextDefinition> {
    return this.post('', request)
  }

  updateText(id: number, request: TextChangeRequest): Observable<TextDefinition> {
    return this.put('' + id, request)
  }

  deleteText(id: number): Observable<TextDefinition> {
    return this.delete('' + id)
  }
}
