import React from "react"
import { shallow } from "enzyme"
import { EditExpensePage } from "../../components/EditExpense"
import expenses from "../fixtures/expenses"

let editExpense, removeExpense, history, wrapper

beforeEach(() => {
    editExpense = jest.fn();
    removeExpense = jest.fn();
    history = { push: jest.fn() }
    wrapper = shallow(<EditExpensePage 
        editExpense={editExpense} 
        removeExpense={removeExpense} 
        history={history}
        expense={expenses[1]}/>)
});

test("expect page to render correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("expect onSubmit to return expense with new data", () => {
    const newExpense = {
        description: expenses[2].description,
        amount: expenses[2].amount,
        createdAt: expenses[2].createdAt,
        note: expenses[2].note
    }
    wrapper.find("ExpenseForm").prop("onSubmit")(newExpense)
    expect(history.push).toHaveBeenLastCalledWith("/")
    expect(editExpense).toHaveBeenLastCalledWith(expenses[1].id, newExpense)
});

test("expect remove button press to return id", () => {
    wrapper.find("button").simulate("click");
    expect(history.push).toHaveBeenLastCalledWith("/")
    expect(removeExpense).toHaveBeenLastCalledWith({id: expenses[1].id})
});