import React from "react";
import moment from "moment"
import { shallow } from "enzyme";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";


test("should render expense form correctly", () => {
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot();
});

test("should render expense form with provided expense correctly", () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[2]}/>)
    expect(wrapper).toMatchSnapshot();
});

test("should render error if form submitted with incorrect data", () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find("form").simulate("submit", {
        preventDefault: () => { }
    })
    expect(wrapper.state("showError").length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test("should update state if description input changed", () => {
    const value = "New description!";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("input").at(0).simulate("change", {
        target: { value }
    });
    expect(wrapper.state("description")).toBe(value);
})

test("should update state if note textarea changed", () => {
    const value = "New note!";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("textarea").at(0).simulate("change", {
        target: { value }
    });
    expect(wrapper.state("note")).toBe(value);
});

test("should update state if amount changed", () => {
    const value = "15.55";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("input").at(1).simulate("change", {
        target: { value }
    });
    expect(wrapper.state("amount")).toBe(value);
});

test("should NOT update state if amount changed with invalid data", () => {
    const value = "12.222";
    const value2 = "AAA"
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("input").at(1).simulate("change", {
        target: { value }
    });
    expect(wrapper.state("amount")).toBe("");
    wrapper.find("input").at(1).simulate("change", {
        target: { value: value2 }
    });
    expect(wrapper.state("amount")).toBe("");
});

test("should call onSubmit prop on successful call", () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find("form").simulate("submit", {
        preventDefault: () => { }
    })
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        createdAt: expenses[0].createdAt,
        note: expenses[0].note
    })
});

test("should call onDateChange on successful date change",() => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("SingleDatePicker").prop("onDateChange")(now);
    expect(wrapper.state("createdAt")).toEqual(now);
});

test("should call onFocusChange on successful date change",() => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("SingleDatePicker").prop("onFocusChange")({ focused: true });
    expect(wrapper.state("calanderFocus")).toBeTruthy();
});