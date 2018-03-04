import React from "react"
import { shallow } from "enzyme"
import { EditExpensePage } from "../../components/EditExpense"
import expenses from "../fixtures/expenses"

let startEditExpense, startRemoveExpense, history, wrapper

beforeEach(() => {
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() }
    wrapper = shallow(<EditExpensePage 
        startEditExpense={startEditExpense} 
        startRemoveExpense={startRemoveExpense} 
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
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[1].id, newExpense)
});

test("expect remove button press to return id", () => {
    wrapper.find("button").simulate("click");
    expect(history.push).toHaveBeenLastCalledWith("/")
    expect(startRemoveExpense).toHaveBeenLastCalledWith({id: expenses[1].id})
});