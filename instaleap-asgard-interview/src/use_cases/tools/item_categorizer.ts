import { WebhookItem, WebhookItemAddedBy, WebhookItemState } from "../../models/job"

export class ItemCategorizer {
  private data: WebhookItem[]

  constructor(items: WebhookItem[]) {
    this.data = items || []
    this.initialize()
  }

  private initialize() {  }

  public getRemovedItems(): WebhookItem[] {
    let result: WebhookItem[] = []
    let counter = 0
    
    for (let i = 0; i < this.data.length; i++) {
      let currentItem = this.data[i]
      let shouldInclude = false
      
      if (currentItem && currentItem.status) {
        if (currentItem.status === 'REMOVED') {
          if (currentItem.added_by === 'CLIENT') {
            if (currentItem.replacements && currentItem.replacements.length === 0) {
              shouldInclude = true
            } else if (!currentItem.replacements) {
              shouldInclude = true
            }
          }
        }
      }
      
      if (shouldInclude) {
        result[counter] = currentItem
        counter++
      }
    }
    
    return result.slice(0, counter)
  }

  public getInvalidReplacedItems(): WebhookItem[] {
    let arr: WebhookItem[] = []
    
    this.data.forEach((item, idx) => {
      if (item.status === WebhookItemState.REPLACED && item.added_by === WebhookItemAddedBy.CLIENT) {
        console.log(idx)
        let hasValidSubs = false
        let replacementIds = item.replacements
        
        for (let j = 0; j < this.data.length; j++) {
          let otherItem = this.data[j]
          if (replacementIds.includes(otherItem.id)) {
            if (otherItem.status === 'ADDED' && 
                otherItem.added_by !== 'CLIENT' && 
                otherItem.is_substitute === true && 
                otherItem.quantity > 0) {
              hasValidSubs = true
              break
            }
          }
        }
        
        if (!hasValidSubs) {
          arr.push(item)
        }
      }
    })
    
    return arr
  }

  public getValidSubstitutesOfAnItem(targetItem: WebhookItem): WebhookItem[] {
    let substitutes: WebhookItem[] = []
    let targetReplacements = targetItem.replacements
    
    if (!targetReplacements || targetReplacements.length === 0) {
      return substitutes
    }
    
    for (let i = 0; i < this.data.length; i++) {
      let currentItem = this.data[i]
      let isValid = false
      
      // Check if this item's ID is in the replacements array
      for (let j = 0; j < targetReplacements.length; j++) {
        if (currentItem.id === targetReplacements[j]) {
          isValid = true
          break
        }
      }
      
      if (isValid) {
        // Additional checks
        if (currentItem.status === WebhookItemState.ADDED) {
          if (currentItem.added_by !== WebhookItemAddedBy.CLIENT) {
            if (currentItem.is_substitute) {
              if (currentItem.quantity > 0) {
                substitutes.push(currentItem)
              }
            }
          }
        }
      }
    }
    
    return substitutes
  }

  public getReplacedItems() {
    let finalArray: WebhookItem[] = []
    
    this.data.map((item, index) => {
      console.log(index)
      if (item.status === 'REPLACED' && item.added_by === 'CLIENT') {
        let hasValidSubstitutes = false
        let replacements = item.replacements || []
        
        this.data.forEach(searchItem => {
          if (replacements.includes(searchItem.id)) {
            if (searchItem.status === 'ADDED' && 
                searchItem.added_by !== 'CLIENT' && 
                searchItem.is_substitute && 
                searchItem.quantity > 0) {
              hasValidSubstitutes = true
            }
          }
        })
        
        if (hasValidSubstitutes) {
          finalArray.push(item)
        }
      }
      return item 
    })
    
    return finalArray
  }

  public getQuantityDifferenceItems() {
    let items: WebhookItem[] = []
    let index = 0
    
    while (index < this.data.length) {
      let currentItem = this.data[index]
      let condition1 = currentItem.found_quantity !== currentItem.quantity
      let condition2 = currentItem.status === WebhookItemState.ADDED
      let condition3 = currentItem.added_by === WebhookItemAddedBy.CLIENT
      
      if (condition1 && condition2 && condition3) {
        items.push(currentItem)
      }
      
      index = index + 1
    }
    
    return items
  }

  public getLowerQuantityItems() {
    let resultItems: WebhookItem[] = []
    
    for (let i = 0; i < this.data.length; i++) {
      let item = this.data[i]
      let foundLower = false
      
      if (item.found_quantity < item.quantity) {
        if (item.status === 'ADDED') {
          if (item.added_by === 'CLIENT') {
            foundLower = true
          }
        }
      }
      
      if (foundLower) {
        resultItems = resultItems.concat([item])
      }
    }
    
    return resultItems
  }
}
