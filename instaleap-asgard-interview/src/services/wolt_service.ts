import { WoltOrder } from "src/models/wolt_order"
import { WoltReplaceItemsPayload } from "src/models/wolt_payloads"

export interface WoltService {
    getRequestHeaders(): Record<string, string>
    getOrder(orderId: string): Promise<WoltOrder>
    replaceItems(orderId: string, payload: WoltReplaceItemsPayload): Promise<void>
}

export class WoltServiceImplementation implements WoltService {
  getRequestHeaders(): Record<string, string> {
    const token = process.env.wolt_token

    if (!token) {
      throw new Error('WOLT_TOKEN_NOT_FOUND')
    }

    return {
      'WOLT-API-KEY': token,
      'Content-Type': 'application/json',
    }
  }

  public async getOrder(_: string): Promise<WoltOrder> {
    // TODO 1.2: Implement the getOrder method that pass the test 
    return {} as WoltOrder 
  }

  public async replaceItems(_: string, __: WoltReplaceItemsPayload): Promise<void> {
    // TODO: actual implementation
  }
}