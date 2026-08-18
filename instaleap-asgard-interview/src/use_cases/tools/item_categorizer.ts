import { WebhookItem, WebhookItemAddedBy, WebhookItemState } from '../../models/job'

export class ItemCategorizer {
  private readonly data: WebhookItem[]

  constructor(items: WebhookItem[]) {
    this.data = items ?? []
  }

  getRemovedItems(): WebhookItem[] {
    return this.data.filter(
      (item) =>
        item.status === WebhookItemState.REMOVED &&
        item.added_by === WebhookItemAddedBy.CLIENT &&
        (!item.replacements || item.replacements.length === 0),
    )
  }

  getReplacedItems(): WebhookItem[] {
    return this.data.filter(
      (item) =>
        item.status === WebhookItemState.REPLACED &&
        item.added_by === WebhookItemAddedBy.CLIENT &&
        this.getValidSubstitutesOfAnItem(item).length > 0,
    )
  }

  getValidSubstitutesOfAnItem(targetItem: WebhookItem): WebhookItem[] {
    return this.data.filter(
      (item) =>
        targetItem.replacements?.includes(item.id) &&
        item.status === WebhookItemState.ADDED &&
        item.added_by !== WebhookItemAddedBy.CLIENT &&
        item.is_substitute &&
        item.quantity > 0,
    )
  }
}
