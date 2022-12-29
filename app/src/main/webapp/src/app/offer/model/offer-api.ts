import {BookingInfo} from "../../booking/model/booking-api";

export interface OfferInfoSelectResultEntry {
  date: string,
  infos: OfferInfo[]
}

export interface OfferInfo {
  offer: Offer,
  amountOfSpaceTotal: number,
  amountOfSpaceAvailable: number,
  amountOfSpaceConfirmed: number
  amountOfSpaceUnconfirmed: number,
  bookings: BookingInfo[]
}

export class OfferInfoSelectRequest {
  public constructor(
    public groupSize: number,
    public dates: string[]
  ) {
  }
}


export interface Offer {
  id: number,
  start: string,
  end: string,
  maxPersons: number,
  active: boolean
}
