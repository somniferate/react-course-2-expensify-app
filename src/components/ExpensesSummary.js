import React from "react"
import { connect } from "react-redux"
import selectExpensesTotal from "../selectors/expenses-total"
import selectExpense from "../selectors/expenses"
import numeral from "numeral"
import { Link } from "react-router-dom"


export const ExpensesSummary = ({ expensesCount, expensesTotal }) => {
    return (
        <div className="page-header">
            <div className="content-container">
                {expensesCount !== 0 && <h1 className="page-header__title">Viewing <span>{expensesCount}</span> expense{expensesCount > 1 ? "s" : ""} totalling <span>{numeral(expensesTotal / 100).format("$0,0.00")}</span></h1> }
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
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