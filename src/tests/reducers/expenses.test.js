import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses"

test ("testing default values of reducer", () => {
    const state = expensesReducer(undefined, { type: "@@INIT" });
    expect(state).toEqual([]);
});

test ("remove id from state if id found", () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test ("do not remove id from state if id not found", () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: "-1"
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test ("add expense to state", () => {
    const expense = {
        id: "400",
        description: "Cat Food",
        amount: 40000,
        note: "",
        createdAt:0
    }
    const action = {
         type: "ADD_EXPENSE",
         expense
    }

    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense]);
})

test ("edit expense with valid id", () => {
    const update = {
        amount: 500000,
    }
    const action = {
        type: "EDIT_EXPENSE",
        id: expenses[2].id,
        update
    }
    const state = expensesReducer(expenses, action);
    expect(state[2].amount).toBe(update.amount)
})

test ("edit expense with valid id", () => {
    const update = {
        amount: 500000,
    }
    const action = {
        type: "EDIT_EXPENSE",
        id: "-1",
        update
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses)
});

test("set expenses to state", () => {

    const action = {
        type:"SET_EXPENSES",
        expenses: [expenses[1]]
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[1]])
});