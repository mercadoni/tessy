
import { InteractorResponse } from '../models/interactor'
import { WoltItemChangesPayload, WoltReplaceItemsPayload, WoltReplacementItemTypePayload } from '../models/wolt_payloads'
import { WoltService } from '../services/wolt_service'
import { ItemCategorizer } from './tools/item_categorizer'
import { WebhookItem, WebhookJobEvent } from '../models/job'

export class ReceiveOrderPickingInteractor {
  private readonly itemCategorizer: ItemCategorizer
  private readonly currencyCode: string
  private readonly woltOrderId: string

  constructor(
    private readonly woltService: WoltService,
    payload: WebhookJobEvent,
  ) {
    const { client_reference, job_items: jobItems, payment_info: paymentInfo } = payload.job
    this.woltOrderId = client_reference
    this.currencyCode = paymentInfo.currency_code

    this.itemCategorizer = new ItemCategorizer(jobItems)
  }

  public async handleEvent(): Promise<InteractorResponse> {
    const items = this.getItems()
    if (items.item_changes.length !== 0) {
      await this.woltService.replaceItems(this.woltOrderId, items)
    }

    return {
      message: 'EVENT_SUCCESSFULLY_MANAGED',
    }
  }

  private getItems(): WoltReplaceItemsPayload {
    const removedOrInvalidReplacementItems = this.getRemovedOrInvalidReplacementItems()
    const noMatchedQuantityItems = this.getQuantityDifferenceItems()
    const validReplacementsItems = this.getValidReplacementsItems()

    return {
      item_changes: [...removedOrInvalidReplacementItems, ...noMatchedQuantityItems, ...validReplacementsItems],
    }
  }

  private getRemovedOrInvalidReplacementItems(): WoltItemChangesPayload[] {
    const invalidReplacements = this.itemCategorizer.getInvalidReplacedItems()
    const removed = this.itemCategorizer.getRemovedItems()

    const items = invalidReplacements.concat(removed)
    const mappedItems = items.map((item) => this.mapRemovedOrInvalidReplacementItems(item))

    return mappedItems
  }

  private mapRemovedOrInvalidReplacementItems(_: WebhookItem): WoltItemChangesPayload {
    // TODO 2.1: Implement the actual mapping logic for removed or invalid replacement items
    // This is a stub implementation, replace with actual logic
    return {
      row_number: 0,
      replacement_items: [
        {
          replacement_type: WoltReplacementItemTypePayload.TEST,
          count: 0,
        },
      ],
    }
  }

  private getQuantityDifferenceItems(): WoltItemChangesPayload[] {
    const quantityDifference = this.itemCategorizer.getQuantityDifferenceItems()
    const items = quantityDifference.map((item) => this.mapNoMatchedQuantityItems(item))

    return items
  }

  private mapNoMatchedQuantityItems(_: WebhookItem): WoltItemChangesPayload {
      return {
      row_number: 0,
      replacement_items: [
        {
          replacement_type: WoltReplacementItemTypePayload.TEST,
          count: 0,
        },
      ],
    }
  }

  public isUnitary(item: WebhookItem) {
    return item.unit.toUpperCase() === 'UN'
  }

  private getValidReplacementsItems(): WoltItemChangesPayload[] {
    const replacements = this.itemCategorizer.getReplacedItems()
    const items = replacements.map((item) => this.mapValidReplacement(item))

    return items
  }

  private mapValidReplacement(_: WebhookItem): WoltItemChangesPayload {
    // TODO 2.3: Implement the actual mapping logic for valid replacements
    // This is a stub implementation, replace with actual logic
    // Check the README for more details
    return {
      row_number: 0,
      replacement_items: [
        {
          replacement_type: WoltReplacementItemTypePayload.TEST,
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
