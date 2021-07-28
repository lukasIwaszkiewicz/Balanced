import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {BudgetItemType} from '../models/budget-item-type';
import {BudgetItem} from '../models/budget-item';


@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private _items$: BehaviorSubject<BudgetItem[]>[] = []
  public items$: Observable<BudgetItem[]>[] = [];

  constructor() {
    for (let type in BudgetItemType) {
      if (BudgetItemType.hasOwnProperty(type)) {
        this._items$[type] = new BehaviorSubject<BudgetItem[]>([])
        this.items$[type] = this._items$[type].asObservable();
      }
    }
  }

  public addItem(budgetItem: BudgetItem): void {
    if (budgetItem.budgetItemId === 0) {
      budgetItem.budgetItemId = this.generateId(budgetItem.budgetItemType);
      this._items$[budgetItem.budgetItemType].next(this._items$[budgetItem.budgetItemType].value.concat(budgetItem));
    }
  }

  public setBatch(type: BudgetItemType, budgetItems: BudgetItem[]): void {
    this._items$[type].next(budgetItems);
  }

  private generateId(budgetItemType: BudgetItemType) {
    return Math.max(...this._items$[budgetItemType].value.map((i) => i.budgetItemId), 0) + 1;
  }

  delete(budgetItem: BudgetItem) {
    const idx = this._items$[budgetItem.budgetItemType].value.indexOf(budgetItem);
    if (idx > -1) {
      this._items$[budgetItem.budgetItemType].value.splice(idx, 1)
      this._items$[budgetItem.budgetItemType].next(this._items$[budgetItem.budgetItemType].value)
    }
  }
}
