export interface DayInfo {
  date: string,
  start: string,
  end: string,
   amountOfOfferTotal: number,
   amountOfOfferAvailable: number,
   amountOfOfferBooked: number,

   amountOfSpaceTotal: number,
   amountOfSpaceAvailable: number,
   amountOfSpaceBooked: number
}

export const defaultDayInfo: DayInfo = {
  date: "",
  start: "",
  end: "",
  amountOfOfferTotal: 0,
  amountOfOfferAvailable: 0,
  amountOfOfferBooked: 0,
  amountOfSpaceTotal: 0,
  amountOfSpaceAvailable: 0,
  amountOfSpaceBooked: 0
}

export class DayInfoSelectRequest {
  public constructor(
    public from: string,
    public to: string
  ) {
  }
}
