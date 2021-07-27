export enum BudgetItemType {
  income,
  expense
}

export function budgetItemTypes(): number[] {
  const types = [];
  for (let type in BudgetItemType) {
    if (isNaN(+type)) {
      continue
    }
    if (BudgetItemType.hasOwnProperty(type)) {
      types.push(type)
    }
  }

  return types as unknown as BudgetItemType[];
}
