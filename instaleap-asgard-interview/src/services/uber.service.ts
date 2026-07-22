import { UberReplaceItemsPayload } from "src/models/uber_payloads"

export interface UberService {
    getRequestHeaders(): Record<string, string>
    replaceItems(orderId: string, payload: UberReplaceItemsPayload): Promise<void>
}

export class UberServiceImplementation implements UberService {
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

  public async replaceItems(_: string, __: UberReplaceItemsPayload): Promise<void> {
    // TODO: actual implementation
  }
}