import {Injectable} from '@angular/core';
import {BudgetService} from './budget.service';
import {BudgetItemType, budgetItemTypes} from '../models/budget-item-type';
import {BudgetItem} from '../models/budget-item';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  constructor(private budgetService: BudgetService) {

  }

  public init():void {
    for (let type in budgetItemTypes()) {
      this.budgetService.items$[type].subscribe((x) => {
        localStorage.removeItem('type-' + type);
        localStorage.setItem('type-' + type, JSON.stringify(x))
      })
    }
  }

  public load(type: BudgetItemType): BudgetItem[] {
    const items = localStorage.getItem('type-' + type);
    if (items) {
      return JSON.parse(items) as BudgetItem[];
    } else {
      return [];
    }
  }

}
