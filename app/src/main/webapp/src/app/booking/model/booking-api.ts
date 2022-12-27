import {VisitorGroupChangeRequest} from "../../visitor-group/model/visitor-group-api";

export class CreateBookingRequest {
  constructor(
    public visitorGroupChangeRequest: VisitorGroupChangeRequest,
    public offerIds: number[],
    public comment: string,
    public termsAndConditions: boolean
  ) {
  }
}


export interface BookingRequest {
  id: number,
  comment: string,
  status: string
}
