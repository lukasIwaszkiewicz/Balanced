import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetItemsContainerComponent } from './budget-items-container.component';

describe('BudgetItemsContainerComponent', () => {
  let component: BudgetItemsContainerComponent;
  let fixture: ComponentFixture<BudgetItemsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetItemsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetItemsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
