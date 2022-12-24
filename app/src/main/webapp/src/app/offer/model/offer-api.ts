export interface OfferInfoSelectResult{
  offers: OfferInfoSelectEntry[]
}

export interface OfferInfoSelectEntry {

}

export class OfferInfoSelectRequest {
  public constructor(
    public groupSize: number,
    public dates: string[]
  ) {
  }
}
