import {DayInfoBooking} from "../../booking/model/booking-api";
import {Offer} from "../../backoffice/offer/model/offer-api";

export interface OfferInfoSelectResultEntry {
  date: string,
  infos: DayInfoOffer[]
}

export interface DayInfoOffer {

  offer: Offer,
  space: any,
  bookings: DayInfoBooking[]
}

export class DayInfoHelper {
  static getSpaceAvailable(info: DayInfoOffer): number {
    return (info.offer.active) ? info.offer.maxPersons - info.space.CONFIRMED - info.space.UNCONFIRMED : 0
  }

  static getSpaceConfirmed(info: DayInfoOffer): number {
    return (info.offer.active) ? info.space.CONFIRMED : 0
  }

  static getSpaceUnconfirmed(info: DayInfoOffer): number {
    return (info.offer.active) ? info.space.UNCONFIRMED : 0
  }
}

export class OfferInfoSelectRequest {
  public constructor(
    public groupSize: number,
    public dates: string[]
  ) {
  }
}


