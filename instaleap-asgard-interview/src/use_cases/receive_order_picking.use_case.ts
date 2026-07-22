
import { UseCaseResponse } from '../models/interactor'
import { UberItemChangesPayload, UberReplaceItemsPayload, UberReplacementItemTypePayload } from '../models/uber_payloads'
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

  public async handleEvent(): Promise<UseCaseResponse> {
    const items = this.buildUberReplacementItems()
    if (items.item_changes.length !== 0) {
      await this.uberService.replaceItems(this.uberOrderId, items)
    }

    return {
      message: 'EVENT_SUCCESSFULLY_MANAGED',
    }
  }

  private buildUberReplacementItems(): UberReplaceItemsPayload {
    const removedItems = this.getRemovedItems()
    const noMatchedQuantityItems = this.getQuantityDifferenceItems()
    const validReplacementsItems = this.getValidReplacementsItems()

    return {
      item_changes: [...removedItems, ...noMatchedQuantityItems, ...validReplacementsItems],
    }
  }

  private getRemovedItems(): UberItemChangesPayload[] {
    const items = this.itemCategorizer.getRemovedItems()

    const mappedItems = items.map((item) => this.mapRemovedItems(item))

    return mappedItems
  }

  private mapRemovedItems(_: WebhookItem): UberItemChangesPayload {
    // TODO 2.1: Implement the actual mapping logic for removed items
    // This is a stub implementation, replace with actual logic
    // Check the README for more details

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

  private getQuantityDifferenceItems(): UberItemChangesPayload[] {
    const quantityDifference = this.itemCategorizer.getQuantityDifferenceItems()
    const items = quantityDifference.map((item) => this.mapNoMatchedQuantityItems(item))

    return items
  }

  private mapNoMatchedQuantityItems(_: WebhookItem): UberItemChangesPayload {
    // TODO 2.2: Implement the actual mapping logic for not matching quantity items
    // This is a stub implementation, replace with actual logic
    // Check the README for more details

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

  public isUnitary(item: WebhookItem) {
    return item.unit.toUpperCase() === 'UN'
  }

  private getValidReplacementsItems(): UberItemChangesPayload[] {
    const replacements = this.itemCategorizer.getReplacedItems()
    const items = replacements.map((item) => this.mapValidReplacement(item))

    return items
  }

  private mapValidReplacement(_: WebhookItem): UberItemChangesPayload {
    // TODO 2.3: Implement the actual mapping logic for valid replacements
    // This is a stub implementation, replace with actual logic
    // Check the README for more details
    
    return {
      row_number: 0,
      replacement_items: [
        {
          replacement_type: UberReplacementItemTypePayload.TEST,
          count: 0,
          name: '',
          price: {
            amount: 0,
            currency: this.currencyCode
          },
        },
      ],
    }
  }
}
