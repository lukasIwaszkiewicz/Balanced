import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BudgetItem} from '../../models/budget-item';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-budget-item-editor',
  templateUrl: './budget-item-editor.component.html',
  styleUrls: ['./budget-item-editor.component.scss']
})
export class BudgetItemEditorComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<BudgetItemEditorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BudgetItem, private fb: FormBuilder) {
    this.form = this.fb.group({
      description: [this.data.description, [Validators.required]],
      amount: [this.data.amount, [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  update() {
    this.close('update', {
      budgetItemId: this.data.budgetItemId,
      budgetItemType: this.data.budgetItemType,
      amount: this.form.get('amount')?.value,
      description: this.form.get('description')?.value
    })
  }

  delete() {
    this.close('delete', this.data)
  }

  private close(action: string, data?: BudgetItem) {
    this.dialogRef.close({
      action: action,
      data: data
    })
  }

}
