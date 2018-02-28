import React from "react";
import ReactDOM from "react-dom";
// import 'react-dates/initialize'
import {Provider} from "react-redux"
import AppRouter from "./routers/AppRouter"
import configureStore from "./store/configureStore"
import "./styles/styles.scss";
import "normalize.css/normalize.css";
import "react-dates/lib/css/_datepicker.css";


import {addExpense} from "./actions/expenses";
import {setTextFilter} from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses"

const store = configureStore();

store.dispatch(addExpense( { description: "water bill", amount: 400} ));
store.dispatch(addExpense({ description: "coffee bill", createdAt: 800}));
store.dispatch(addExpense({ description: "rent", amount: 8020}));

const state = store.getState();
console.log(getVisibleExpenses(state.expenses, state.filter));

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));