export class OfferSeriesRequest {
  constructor(
    public maxPersons: number,
    public start: string,
    public duration: string,
    public interval: string,
    public quantity: number,
    public minTime: string,
    public maxTime: string,
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


export interface OfferChangeForm {
  date: string,
  startTime: string,
  endTime: string,
  maxPersons: number,
  active: boolean
}