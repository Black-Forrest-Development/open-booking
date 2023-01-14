export interface TextDefinition {
  id: number,
  lang: string,
  type: string,
  content: string
}

export class TextChangeRequest {
  constructor(
    public lang: string,
    public type: string,
    public content: string
  ) {
  }
}
