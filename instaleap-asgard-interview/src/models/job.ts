
export interface WebhookJobEvent {
  job: WebhookJob
}

export interface WebhookJob {
  client_reference: string
  job_items: WebhookItem[]
  payment_info: WebhookPaymentInfo
}

export interface WebhookItem {
  id: string
  name: string
  status: WebhookItemState
  replacements: string[]
  is_substitute: boolean
  added_by: WebhookItemAddedBy
  quantity: number
  found_quantity: number
  attributes: WebhookItemAttributes
  unit: string
  price: number
}

export interface WebhookPaymentInfo {
  currency_code: string
}

export enum WebhookItemState {
  ADDED = 'ADDED',
  REMOVED = 'REMOVED',
  REPLACED = 'REPLACED',
}

export enum WebhookItemAddedBy {
  CLIENT = 'CLIENT',
  PICKER = 'PICKER',
  CONTROL_TOWER = 'CONTROL_TOWER',
  LSW = 'LSW',
}

interface WebhookItemAttributes {
  [attribute: string]: string | number
}
