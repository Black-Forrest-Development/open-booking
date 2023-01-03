import {DayInfoBooking} from "../../booking/model/booking-api";

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


export interface Offer {
  id: number,
  start: string,
  end: string,
  maxPersons: number,
  active: boolean
}


export class OfferChangeRequest {
  constructor(
    public start: string,
    public finish: string,
    public maxPersons: number,
    public active: boolean
  ) {
  }
}
