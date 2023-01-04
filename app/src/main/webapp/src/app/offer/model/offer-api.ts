import {DayInfoBooking} from "../../booking/model/booking-api";
import {Offer} from "../../admin/offer-admin/model/offer-admin-api";

export interface OfferInfoSelectResultEntry {
  date: string,
  infos: DayInfoOffer[]
}

export interface DayInfoOffer {

  offer: Offer,
  space: any,
  bookings: DayInfoBooking[]
}

export class OfferInfoSelectRequest {
  public constructor(
    public groupSize: number,
    public dates: string[]
  ) {
  }
}


