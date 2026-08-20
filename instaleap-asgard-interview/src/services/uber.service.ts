import axios from 'axios'
import { UberReplaceItemsPayload } from '../models/uber_payloads'

export interface UberService {
  getRequestHeaders(): Record<string, string>
  replaceItems(orderId: string, payload: UberReplaceItemsPayload): Promise<void>
}

export class UberServiceImplementation implements UberService {
  private readonly baseUrl: string

  constructor() {
    this.baseUrl = process.env.uber_base_url ?? 'http://localhost:8080'
  }

  getRequestHeaders(): Record<string, string> {
    const token = process.env.uber_token

    if (!token) {
      throw new Error('UBER_TOKEN_NOT_FOUND')
    }

    return {
      'UBER-API-KEY': token,
      'Content-Type': 'application/json',
    }
  }

  async replaceItems(orderId: string, payload: UberReplaceItemsPayload): Promise<void> {
    // TODO: Call the Uber replace-items endpoint.
    // Use the Postman collection (Interview.postman_collection.json) to find the request shape.
    // The base URL and auth headers are already set up — focus on the HTTP call itself.
    // Hint: POST /order/{orderId}/replace_items
    console.log(`replaceItems called for order ${orderId}`, payload)
  }
}
