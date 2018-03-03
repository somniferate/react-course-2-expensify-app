import totalExpenses from "../../selectors/expenses-total"
import expenses from "../fixtures/expenses"

test("should return 0 when passed no expenses", () => {
    const total = totalExpenses([])
    expect(total).toBe(0)
});

test("should return an expenses amount when passed a single expense", () => {
    const total = totalExpenses([expenses[1]])
    expect(total).toBe(expenses[1].amount);
});

test("should return total of fixtures when passed all fixture expenses", () => {
    const total = totalExpenses(expenses);
    const actualTotal = expenses.map(a => a.amount).reduce((a,b)=>a+b)
    expect(total).toBe(actualTotal)
});