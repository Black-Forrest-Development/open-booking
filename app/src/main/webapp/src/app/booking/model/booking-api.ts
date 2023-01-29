import {VisitorGroupChangeRequest} from "../../visitor-group/model/visitor-group-api";
import {Offer} from "../../backoffice/offer/model/offer-api";


export class CreateBookingRequest {
  constructor(
    public visitorGroupChangeRequest: VisitorGroupChangeRequest,
    public offerIds: number[],
    public comment: string,
    public termsAndConditions: boolean
  ) {
  }
}

export interface DayInfoBooking {
  size: number,
  status: string,
}


export interface BookingInfo {
  id: number,
  offer: Offer,
  spaceAvailable: number,
  spaceConfirmed: number,
  status: string,
  timestamp: string
}
