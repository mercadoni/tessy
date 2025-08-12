export interface WoltRejectOrderPayload {
  reason: string
  code?: WoltCodeRejectOrder
}


export enum WoltCodeRejectOrder {
  GENERIC = 'GENERIC',
  ITEMS_UNAVAILABLE = 'ITEMS_UNAVAILABLE',
  VENUE_CLOSING_SOON = 'VENUE_CLOSING_SOON',
}

export interface WoltReplaceItemsPayload {
  item_changes: WoltItemChangesPayload[]
}

export interface WoltItemChangesPayload {
  row_number: number
  replacement_items: WoltReplacementItemPayload[]
}

export interface WoltReplacementItemPayload {
  replacement_type: WoltReplacementItemTypePayload
  barcode?: string
  count: number
  name?: string
  price?: {
    amount: number
    currency: string
  }
  purchase_item_id?: string
  weight?: number
}

export enum WoltReplacementItemTypePayload {
  COUNT_CHANGE_REPLACEMENT = 'count-change-replacement',
  MENU_ITEM_REPLACEMENT = 'menu-item-replacement',
  WEIGHT_CHANGE_REPLACEMENT = 'weight-change-replacement',
  ADHOC_REPLACEMENT = 'adhoc-replacement',
  TEST = 'test',
}