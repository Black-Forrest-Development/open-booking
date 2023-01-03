import {defaultVisitorGroup, VisitorGroup, VisitorGroupChangeRequest} from "../../../visitor-group/model/visitor-group-api";
import {BookingInfo} from "../../../booking/model/booking-api";

export interface BookingRequest {
  id: number,
  comment: string,
  status: string
}

export class BookingRequestChangeRequest {
  constructor(
    public visitorGroupChangeRequest: VisitorGroupChangeRequest,
    public offerIds: number[],
    public comment: string,
  ) {
  }
}

export interface BookingRequestInfo {
  id: number,
  visitorGroup: VisitorGroup,
  bookings: BookingInfo[],
  status: string,
  comment: string,
  timestamp: string
}

export const defaultBookingRequestInfo: BookingRequestInfo = {
  id: -1,
  visitorGroup: defaultVisitorGroup,
  bookings: [],
  status: "",
  comment: "",
  timestamp: ""
}

export interface BookingRequestChangeResult {
  success: boolean,
  msg: string
}
