import {Component, OnInit} from '@angular/core';
import {BudgetService} from '../../services/budget.service';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BudgetItemType} from '../../models/budget-item-type';

@Component({
  selector: 'app-total-budget',
  templateUrl: './total-budget.component.html',
  styleUrls: ['./total-budget.component.scss']
})
export class TotalBudgetComponent implements OnInit {

  total$: Observable<number>

  constructor(private budgetService: BudgetService) {
    this.total$ = combineLatest(
      [this.budgetService.items$[BudgetItemType.income], this.budgetService.items$[BudgetItemType.expense]])
      .pipe(
        map(([income, expense]) => {
          const in_ = income.reduce((a, b) => a + b.amount, 0);
          const exp_ = expense.reduce((a, b) => a + b.amount, 0);
          return in_ - exp_;
        })
      )

  }

  ngOnInit(): void {
  }

}
