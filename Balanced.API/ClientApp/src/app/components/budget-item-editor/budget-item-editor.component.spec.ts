import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetItemEditorComponent } from './budget-item-editor.component';

describe('BudgetItemEditorComponent', () => {
  let component: BudgetItemEditorComponent;
  let fixture: ComponentFixture<BudgetItemEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetItemEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetItemEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
