export interface WoltOrder {
  id: string
  venue: WoltVenue
  basket_price: WoltPriceDetails
  delivery: WoltDeliveryDetails
  fees: WoltFeesDetails
  items: WoltOrderItem[]
  created_at: string
  consumer_comment?: string | null
  consumer_name: string
  consumer_phone_number?: string
  pickup_eta?: string
  attribution_id: string
  type: WoltType
  pre_order: WoltPreOrderDetails
  order_number: string
  order_status: WoltOrderStatus
  modified_at: string
  company_tax_id?: string
  loyalty_card_number?: string | null
  cash_payment?: WoltCashPayment
  merchant?: WoltMerchant
  delivery_provider_type?: string
}

export interface WoltVenue {
  id: string
  name: string
  external_venue_id?: string
}

export interface WoltPriceDetails {
  total: WoltAmount
  price_breakdown: WoltPriceBreakdown
}

export interface WoltAmount {
  amount: number
  currency: string
}

export interface WoltPriceBreakdown {
  total_before_discounts: WoltAmount
  total_discounts: WoltAmount
  base_price_before_discounts: WoltAmount
  subtotal_basket_discounts: WoltAmount
  subtotal_item_discounts: WoltAmount
  unit_price_before_discounts: WoltAmount
  subtotal_options_basket_discounts: WoltAmount
  subtotal_options_item_discounts: WoltAmount
}

export interface WoltDeliveryDetails {
  status: WoltDeliveryStatus
  type: WoltDeliveryType
  time: string
  location: WoltDeliveryLocation
  self_delivery: boolean
}

export enum WoltDeliveryType {
  TAKEAWAY = 'takeaway',
  HOMEDELIVERY = 'homedelivery',
}

export enum WoltDeliveryStatus {
  estimated = 1,
  drop_off_estimated,
  courier_at_venue,
  courier_at_delivery_location,
  picked_up,
  delivered,
  none,
}

export interface WoltDeliveryLocation {
  street_address: string
  apartment: string
  city: string
  country: string
  coordinates: WoltCoordinates
  formatted_address: string
}

export interface WoltCoordinates {
  lon: number
  lat: number
}

export interface WoltFeesDetails {
  total: WoltAmount
  price_breakdown: WoltFeesBreakdown
  parts: WoltFeePart
}

export interface WoltFeesBreakdown {
  total_before_discounts: WoltAmount
  total_discounts: WoltAmount
  liability: WoltAmount
}

export interface WoltFeePart {
  type: string
  total: WoltAmount
}

export interface WoltOrderItem {
  id: string
  count: number
  pos_id?: string
  sku: string
  gtin: string
  options: WoltItemOption[]
  item_price: WoltItemPrice
  name: string
  category: WoltItemCategory
  deposit?: WoltDepositDetails
  is_bundle_offer: boolean
  row_number: number
  substitution_settings: WoltSubstitutionSettings
  weight_details?: WoltWeightDetails
}

export interface WoltItemOption {
  id: string
  name: string
  value: string
  price: WoltAmount
  pos_id?: string
  count: number
  value_pos_id?: string
  deposit?: WoltDepositDetails
}

export interface WoltDepositDetails {
  gross_price: WoltAmount
  net_price: WoltAmount
  vat_percentage: number
}

export interface WoltItemPrice {
  unit_price: WoltAmount
  total: WoltAmount
  price_breakdown: WoltPriceBreakdown
}

export interface WoltItemCategory {
  id: string
  name: string
}

export interface WoltSubstitutionSettings {
  is_allowed: boolean
  comment?: string | null
}

export interface WoltWeightDetails {
  weight_in_grams: number
  requested_amount: number
  extra_weight_percentage: number
}

export enum WoltType {
  INSTANT = 'instant',
  PREORDER = 'preorder',
}

export interface WoltPreOrderDetails {
  preorder_time: string
  pre_order_status: WoltPreOrderStatus
}

export enum WoltPreOrderStatus {
  waiting = 1,
  confirmed,
}

export enum WoltOrderStatus {
  received = 1,
  fetched,
  acknowledged,
  production,
  ready,
  delivered,
  rejected,
  refunded,
  Other,
}

export interface WoltCashPayment {
  cash_amount: WoltAmount
  cash_to_expect?: WoltAmount
}

export interface WoltMerchant {
  id: string
}

