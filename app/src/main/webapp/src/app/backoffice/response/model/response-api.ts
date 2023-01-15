export interface Response {
  id: number,
  lang: string,
  type: string,
  title: string,
  content: string
}


export class ResponseChangeRequest {
  constructor(
    public lang: string,
    public type: string,
    public title: string,
    public content: string
  ) {
  }
}

export interface ResolvedResponse {
  title: string,
  content: string
}

export const defaultResolvedResponse: ResolvedResponse = {
  title: '',
  content: ''
}

export class ResolveResponseRequest {
  constructor(
    public lang: string,
    public type: string,
    public reference: Reference
  ) {

  }
}

export class Reference {
  constructor(
    public id: number,
    public type: string
  ) {
  }
}

export const RESPONSE_TYPE_BOOKING_CONFIRMATION_DIALOG = 'BOOKING_CONFIRMATION_DIALOG'

export const RESPONSE_TYPES = [RESPONSE_TYPE_BOOKING_CONFIRMATION_DIALOG]
