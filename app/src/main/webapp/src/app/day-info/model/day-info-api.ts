import {OfferInfo} from "../../offer/model/offer-api";

export interface DayInfo {
  date: string,
  start: string,
  end: string,
  offer: OfferInfo[]
}

export const defaultDayInfo: DayInfo = {
  date: "",
  start: "",
  end: "",
  offer: []
}

export class DateRangeSelectionRequest {
  public constructor(
    public from: string,
    public to: string
  ) {
  }
}
