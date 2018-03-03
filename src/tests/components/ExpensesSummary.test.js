import React from "react"
import { ExpensesSummary } from "../../components/ExpensesSummary"
import expensesFixtures from "../fixtures/expenses"
import {shallow} from "enzyme"

test("expect nothing to render if zero expenses passed", () => {
    const expenses = []
    const wrapper = shallow(<ExpensesSummary expensesCount={0} expensesTotal={0}/>)
    expect(wrapper).toMatchSnapshot()
})

test("expect a total to render if one expense passed", () => {
    const expenses = [expensesFixtures[1]]
    const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesTotal={195}/>)
    expect(wrapper).toMatchSnapshot()
})

test("expect fixtures total to render if all expenses passed", () => {
    const expenses = expensesFixtures
    const wrapper = shallow(<ExpensesSummary expensesCount={5} expensesTotal={30025}/>)
    expect(wrapper).toMatchSnapshot()
})