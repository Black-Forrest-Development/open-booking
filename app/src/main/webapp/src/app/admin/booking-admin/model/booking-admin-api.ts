import {defaultVisitorGroup, VisitorGroup} from "../../../visitor-group/model/visitor-group-api";
import {defaultOffer, Offer} from "../../offer-admin/model/offer-admin-api";

export interface Booking {
  id: number,
  offerId: number,
  visitorGroupId: number,
  status: string,
}

export const defaultBooking: Booking = {
  id: -1,
  offerId: -1,
  visitorGroupId: -1,
  status: ""
}


export interface BookingDetails {
  booking: Booking,
  visitorGroup: VisitorGroup
}

export const defaultBookingDetails: BookingDetails = {
  booking: defaultBooking,
  visitorGroup: defaultVisitorGroup
}

export class BookingChangeRequest {
  constructor(
    public offerId: number,
    public visitorGroupId: number,
  ) {
  }
}

export class BookingSearchRequest {
  constructor(
    public query: string
  ) {
  }
}

export interface BookingSearchResult {
  offer: Offer,
  booking: Booking,
  visitorGroup: VisitorGroup
}

export const defaultBookingSearchResult: BookingSearchResult = {
  offer: defaultOffer,
  booking: defaultBooking,
  visitorGroup: defaultVisitorGroup
}
