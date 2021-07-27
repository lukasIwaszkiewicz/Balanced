import {Component, Input, OnInit} from '@angular/core';
import {BudgetService} from '../../services/budget.service';
import {BudgetItemType} from '../../models/budget-item-type';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {BudgetItem} from '../../models/budget-item';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {BudgetItemEditorComponent} from '../budget-item-editor/budget-item-editor.component';

export interface BudgetItemComponentConfiguration {
  name: string;
  description: string;
  type: BudgetItemType;
  color: 'red' | 'green'
}

@Component({
  selector: 'app-budget-items-container',
  templateUrl: './budget-items-container.component.html',
  styleUrls: ['./budget-items-container.component.scss']
})
export class BudgetItemsContainerComponent implements OnInit {

  @Input() configuration!: BudgetItemComponentConfiguration;

  public items$!: Observable<BudgetItem[]>;
  public total = 0;
  public newItemForm!: FormGroup;

  constructor(private budgetService: BudgetService, private fb: FormBuilder, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    if (this.configuration === null || this.configuration === undefined) throw new Error('no budget item type provided');
    this.newItemForm = this.fb.group({
      description: [null, [Validators.required]],
      amount: [null, [Validators.required]]
    })
    this.items$ = this.budgetService.items$[this.configuration.type].pipe(
      tap(x => {
        this.total = x.map(x => x.amount).reduce((i, j) => i + j, 0)
      })
    );
  }


  add(event: Event) {
    event.preventDefault();
    if (this.newItemForm.valid) {
      this.budgetService.addItem({
        budgetItemId: 0,
        budgetItemType: this.configuration.type,
        description: this.newItemForm.get('description')?.value,
        amount: this.newItemForm.get('amount')?.value
      });
      this.newItemForm.reset();
    }
  }

  edit(event: Event, item: BudgetItem) {
    event.preventDefault();
    const dialogRef = this.dialog.open(BudgetItemEditorComponent, {
      width: '350px',
      data: item
    });

    dialogRef.afterClosed().subscribe((result: { action: string, data: BudgetItem }) => {
      if (!result) return;
      if (result.action === 'delete') {
        this.budgetService.delete(result.data)
      }
    });
  }
}
