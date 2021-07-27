import {Component} from '@angular/core';
import {BudgetItemComponentConfiguration} from './components/budget-items-container/budget-items-container.component';
import {BudgetItemType, budgetItemTypes} from './models/budget-item-type';
import {BudgetService} from './services/budget.service';
import {LocalStorageService} from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'balancedApp';

  constructor(private budgetService: BudgetService, private localStorageService: LocalStorageService) {
    for (const type of budgetItemTypes()) {
      this.budgetService.setBatch(type, this.localStorageService.load(type));
    }
    this.localStorageService.init();
  }

  budgetItemTypes: BudgetItemComponentConfiguration[] = [
    {name: 'Income', description: '', type: BudgetItemType.income, color: 'green'},
    {name: 'Expense', description: '', type: BudgetItemType.expense, color: 'red'},
  ]
}
