import { UseCaseResponse } from '../models/interactor'
import {
  UberItemChangesPayload,
  UberReplaceItemsPayload,
  UberReplacementItemTypePayload,
} from '../models/uber_payloads'
import { UberService } from '../services/uber.service'
import { ItemCategorizer } from './tools/item_categorizer'
import { WebhookItem, WebhookJobEvent } from '../models/job'

export class ReceiveOrderPickingUseCase {
  private readonly itemCategorizer: ItemCategorizer
  private readonly currencyCode: string
  private readonly uberOrderId: string

  constructor(
    private readonly uberService: UberService,
    payload: WebhookJobEvent,
  ) {
    const { client_reference, job_items: jobItems, payment_info: paymentInfo } = payload.job
    this.uberOrderId = client_reference
    this.currencyCode = paymentInfo.currency_code
    this.itemCategorizer = new ItemCategorizer(jobItems)
  }

  async handleEvent(): Promise<UseCaseResponse> {
    const payload = this.buildUberReplacementPayload()
    if (payload.item_changes.length !== 0) {
      await this.uberService.replaceItems(this.uberOrderId, payload)
    }

    return { message: 'EVENT_SUCCESSFULLY_MANAGED' }
  }

  private buildUberReplacementPayload(): UberReplaceItemsPayload {
    return {
      item_changes: [
        ...this.mapRemovedItems(),
        ...this.mapValidReplacements(),
      ],
    }
  }

  private mapRemovedItems(): UberItemChangesPayload[] {
    return this.itemCategorizer.getRemovedItems().map((item) => this.buildRemovedItemPayload(item))
  }

  private buildRemovedItemPayload(_: WebhookItem): UberItemChangesPayload {
    // TODO 2: Map a removed item to the Uber payload.
    // Uber needs to know the item is unavailable: set count to 0.
    // See README § mapRemovedOrInvalidReplacementItems for the expected payload shape.
    return {
      row_number: 0,
      replacement_items: [
        {
          replacement_type: UberReplacementItemTypePayload.TEST,
          count: 0,
        },
      ],
    }
  }

  private mapValidReplacements(): UberItemChangesPayload[] {
    return this.itemCategorizer.getReplacedItems().map((item) => this.buildValidReplacementPayload(item))
  }

  private buildValidReplacementPayload(_: WebhookItem): UberItemChangesPayload {
    // TODO 3 (stretch): Map a valid substitute to the Uber payload.
    // Use itemCategorizer.getValidSubstitutesOfAnItem() to get the first valid substitute.
    // See README § mapValidReplacement for the expected payload shape.
    return {
      row_number: 0,
      replacement_items: [
        {
          replacement_type: UberReplacementItemTypePayload.TEST,
          count: 0,
          name: '',
          price: {
            amount: 0,
            currency: this.currencyCode,
          },
        },
      ],
    }
  }
}
