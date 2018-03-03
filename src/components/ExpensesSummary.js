import React from "react"
import { connect } from "react-redux"
import totalExpenses from "../selectors/expenses-total"
import selectExpense from "../selectors/expenses"
import numeral from "numeral"

export const ExpensesSummary = (props) => {
    const expensesCount = props.expenses.length;
    const expensesTotal = totalExpenses(props.expenses)
    return (
        <div>
            {props.expenses.length !== 0 && <p>{`Viewing ${expensesCount} expense${expensesCount > 1 ? "s" : ""} totalling ${numeral(expensesTotal / 100).format("$0,0.00")}`}</p> }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        expenses: selectExpense(state.expenses, state.filter)
    };
}

export default connect(mapStateToProps)(ExpensesSummary)