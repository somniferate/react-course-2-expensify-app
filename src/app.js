import React from "react";
import ReactDOM from "react-dom";
// import 'react-dates/initialize'
import {Provider} from "react-redux"
import AppRouter from "./routers/AppRouter"
import configureStore from "./store/configureStore"
import "./styles/styles.scss";
import "normalize.css/normalize.css";
import "react-dates/lib/css/_datepicker.css";

import { startSetExpenses } from "./actions/expenses";
import {setTextFilter} from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";
import "./firebase/firebase"

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

console.log(process.env.FIREBASE_API_KEY)

ReactDOM.render(<p>Loading...</p>, document.getElementById("app"));

store.dispatch(startSetExpenses()).then(() => {
    ReactDOM.render(jsx, document.getElementById("app"));
});