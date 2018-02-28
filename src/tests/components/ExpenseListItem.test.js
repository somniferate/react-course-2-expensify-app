import React from "react";
import { shallow } from "enzyme";
import {ExpenseListItem} from "../../components/ExpenseListItem";
import expenses from "../fixtures/expenses";

test("should render expense item with expense", () => {
    const wrapper = ExpenseListItem({...expenses[1]});
    expect(wrapper).toMatchSnapshot();
});