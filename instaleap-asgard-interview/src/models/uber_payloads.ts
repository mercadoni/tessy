


export enum UberCodeRejectOrder {
  GENERIC = 'GENERIC',
  ITEMS_UNAVAILABLE = 'ITEMS_UNAVAILABLE',
  VENUE_CLOSING_SOON = 'VENUE_CLOSING_SOON',
}

export interface UberReplaceItemsPayload {
  item_changes: UberItemChangesPayload[]
}

export interface UberItemChangesPayload {
  row_number: number
  replacement_items: UberReplacementItemPayload[]
}

export interface UberReplacementItemPayload {
  replacement_type: UberReplacementItemTypePayload
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

export enum UberReplacementItemTypePayload {
  COUNT_CHANGE_REPLACEMENT = 'count-change-replacement',
  MENU_ITEM_REPLACEMENT = 'menu-item-replacement',
  WEIGHT_CHANGE_REPLACEMENT = 'weight-change-replacement',
  ADHOC_REPLACEMENT = 'adhoc-replacement',
  TEST = 'test',
}