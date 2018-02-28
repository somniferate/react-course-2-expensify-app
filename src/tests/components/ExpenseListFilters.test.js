import React from "react"
import { shallow } from "enzyme"
import { ExpenseListFilters } from "../../components/ExpenseListFilters"
import  { filter, altFilter } from "../fixtures/filters"
import moment from "moment"

let setTextFilter, sortByDate, sortByAmount, setEndDate, setStartDate, wrapper

jest.mock("uuid", () => jest.fn(() => "UUID_ID"))

beforeEach(() => {
    setTextFilter = jest.fn()
    sortByDate = jest.fn()
    sortByAmount = jest.fn()
    setEndDate = jest.fn()
    setStartDate = jest.fn()   
    wrapper = shallow(
        <ExpenseListFilters 
            filters={filter}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
        />)
}) 

test("expect page snapshot to be rendered correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("expect page snapshot to be rendered correctly with alternate data", () => {
    wrapper.setProps({
        filters:{altFilter}
    })
    expect(wrapper).toMatchSnapshot();
});

test("expect text change to call spy with value", () => {
    const textChange = {target: {value: "changed"}}
    wrapper.find("input").simulate("change", textChange)
    expect(setTextFilter).toHaveBeenLastCalledWith(textChange.target.value)
});

test("expect change date to call spy with start and end dates", () => {
    const startDate = moment(0)
    const endDate = moment(0).add(3,"days")
    wrapper.find("DateRangePicker")
            .prop("onDatesChange")({ startDate, endDate })
    expect(setEndDate).toHaveBeenLastCalledWith(endDate)
    expect(setStartDate).toHaveBeenLastCalledWith(startDate)
});

test("checks that sortBy filter will change to amount", () => {
    wrapper.find("select").simulate('change',{target: { value : 'amount'}})
    expect(sortByAmount).toHaveBeenCalledTimes(1)
});

test("checks that sortBy filter will change to date", () => {
    wrapper.setProps({
        filters:{altFilter}
    })  
    wrapper.find("select").simulate('change',{target: { value : 'date'}})
    expect(sortByDate).toHaveBeenCalledTimes(1)
});

test("checks that DateRangePicker will get focussed", () => {
   const focusedInput = "startDate"
   wrapper.find("DateRangePicker").prop("onFocusChange")(focusedInput);
   expect(wrapper.state().focusedInput).toBe(focusedInput)
});