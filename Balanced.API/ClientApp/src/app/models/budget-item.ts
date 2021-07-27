import {BudgetItemType} from './budget-item-type';

export interface BudgetItem {
  budgetItemId: number;
  budgetItemType: BudgetItemType;
  description: string;
  amount: number;
}
