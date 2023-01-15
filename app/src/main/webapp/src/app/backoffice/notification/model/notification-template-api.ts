export interface NotificationTemplate {
  id: number,
  lang: string,
  type: string,
  subject: string,
  content: string
}

export class NotificationTemplateChangeRequest {
  constructor(
    public lang: string,
    public type: string,
    public subject: string,
    public content: string
  ) {
  }
}

export const NOTIFICATION_TEMPLATE_TYPE_HTML = 'HTML'
export const NOTIFICATION_TEMPLATE_TYPE_PLAIN = 'PLAIN'

export const NOTIFICATION_TEMPLATE_TYPES = [NOTIFICATION_TEMPLATE_TYPE_HTML, NOTIFICATION_TEMPLATE_TYPE_PLAIN]


