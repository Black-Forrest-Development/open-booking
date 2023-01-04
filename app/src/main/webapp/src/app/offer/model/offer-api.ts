import {DayInfoBooking} from "../../booking/model/booking-api";
import {Offer} from "../../admin/offer-admin/model/offer-admin-api";

export interface OfferInfoSelectResultEntry {
  date: string,
  infos: DayInfoOffer[]
}

export interface DayInfoOffer {
  offer: Offer,
  amountOfSpaceTotal: number,
  amountOfSpaceAvailable: number,
  amountOfSpaceConfirmed: number
  amountOfSpaceUnconfirmed: number,
  bookings: DayInfoBooking[]
}

export class OfferInfoSelectRequest {
  public constructor(
    public groupSize: number,
    public dates: string[]
  ) {
  }
}

