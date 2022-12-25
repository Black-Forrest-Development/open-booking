export interface OfferInfoSelectResult {
  offers: OfferInfoSelectResultEntry[]
}

export interface OfferInfoSelectResultEntry {
  date: string,
  infos: OfferInfo[]
}

export interface OfferInfo {
  id: number,
  start: string,
  end: string,

  amountOfSpaceTotal: number,
  amountOfSpaceAvailable: number,
  amountOfSpaceBooked: number
}

export class OfferInfoSelectRequest {
  public constructor(
    public groupSize: number,
    public dates: string[]
  ) {
  }
}
