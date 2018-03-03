import React from "react"
import { connect } from "react-redux"
import selectExpensesTotal from "../selectors/expenses-total"
import selectExpense from "../selectors/expenses"
import numeral from "numeral"

export const ExpensesSummary = ({ expensesCount, expensesTotal }) => {
    return (
        <div>
            {expensesCount !== 0 && <p>{`Viewing ${expensesCount} expense${expensesCount > 1 ? "s" : ""} totalling ${numeral(expensesTotal / 100).format("$0,0.00")}`}</p> }
        </div>
    )
}

const mapStateToProps = (state) => {
    const filteredExpenses = selectExpense(state.expenses, state.filter)
    return {
        expensesCount: filteredExpenses.length,
        expensesTotal: selectExpensesTotal(filteredExpenses)
    };
}

export default connect(mapStateToProps)(ExpensesSummary)