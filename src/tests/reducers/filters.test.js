import filtersReducer from "../../reducers/filters";
import moment from "moment"

test("should setup default filter values", () => {
    const state = filtersReducer(undefined, { type: "@@INIT" })
    expect(state).toEqual({
        text: "",
        sortBy: "date",
        startDate: moment().startOf("month"),
        endDate: moment().endOf("month")
    })
})

test("should setup filter by amount", () => {
    const state = filtersReducer(undefined, { type: "SORT_BY_AMOUNT" })
    expect(state.sortBy).toBe("amount")
})

test("should setup text filter", () => {
    const state = filtersReducer(undefined, { type: "SET_TEXT_FILTER", text: "testing"})
    expect(state.text).toBe("testing")
})

test("should setup filter by date", () => {
    const definedState = {
        text: "",
        sortBy: "amount",
        startDate: moment().startOf("month"),
        endDate: moment().endOf("month")
    }

    const state = filtersReducer(undefined, { type: "SORT_BY_DATE" })
    expect(state.sortBy).toBe("date")
})

test("should setup filter by start date", () => {
    const state = filtersReducer(undefined, { type: "SET_START_DATE", startDate: moment(0).valueOf() })
    expect(state.startDate).toBe(moment(0).valueOf())
})

test("should setup filter by end date", () => {
    const state = filtersReducer(undefined, { type: "SET_END_DATE", endDate: moment(0).valueOf() })
    expect(state.endDate).toBe(moment(0).valueOf())
})