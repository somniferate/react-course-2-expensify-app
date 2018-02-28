import {createStore, combineReducers} from "redux";
import uuid from "uuid"

//ADD_EXPENSE

const addExpense = (
    {
        description = "",
        note = "",
        amount = 0,
        createdAt = 0
    }) => ({
    type: "ADD_EXPENSE",
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// REMOVE_EXPENSE

const removeExpense = ({ id } = {}) => ({
    type: "REMOVE_EXPENSE",
    id
});

// EDIT_EXPENSE

const editExpense = (id, update) => ({
    type: "EDIT_EXPENSE",
    id,
    update
})

// SET_TEXT_FILTER

const setTextFilter = (text = "") => ({
    type: "SET_TEXT_FILTER",
    text
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: "SORT_BY_AMOUNT"
});

//SORT_BY_DATE
const sortByDate = () => ({
    type: "SORT_BY_DATE"
});

// Set START/END DATE

const setStartDate = (startDate) => ({
    type: "SET_START_DATE",
    startDate
});

const setEndDate = (endDate) => ({
    type: "SET_END_DATE",
    endDate
});

// expenses reducer

const expensesReducerDefault = []

const expensesReducer = (state = expensesReducerDefault, action) => {
    switch (action.type) {
        case "ADD_EXPENSE":
            return [...state, action.expense]
        case "REMOVE_EXPENSE":
            // console.log(action.expense.id, state[0].id);
            return state.filter( ({id}) => id != action.id)
        case "EDIT_EXPENSE":
            return state.map( expense => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.update
                    }
                } else {
                    return expense
                }
            })
        default:
            return state;
    }
};

// filter reducer
const filterReducerDefaultState = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
};

const filterReducer = (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case "SET_TEXT_FILTER":
            return {
                ...state,
                text: action.text
            };
        case "SORT_BY_AMOUNT":
            return {
                ...state,
                sortBy:"amount"
            };
        case "SORT_BY_DATE":
            return {
                ...state,
                sortBy:"date"
            };
        case "SET_END_DATE":
            return {
                ...state,
                endDate: action.endDate
            };
        case "SET_START_DATE":
            return {
                ...state,
                startDate: action.startDate
            };
        default:
            return state;
    }
};

//get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {

        const startDateMatch = typeof startDate !== "number" || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== "number" || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if (sortBy === "date") {
           return a.createdAt < b.createdAt ? 1 : -1
        } else if (sortBy === "amount") {
            return a.amount < b.amount ? 1 : -1
        }
    });
};

// store creation

const store = createStore(combineReducers( {
    expenses: expensesReducer,
    filter: filterReducer
}))

store.subscribe(() => {
    const state = store.getState();
    const visible = getVisibleExpenses(state.expenses, state.filter)
    console.log(visible);
});



const itemOne = store.dispatch(addExpense( {description : "rent", amount: 100} ));
const itemTwo = store.dispatch(addExpense( {description : "coffee", amount: 300} ));
store.dispatch(sortByAmount());
// store.dispatch(removeExpense({id: itemOne.expense.id}))
// store.dispatch(editExpense(itemTwo.expense.id, {amount: 700}))

// store.dispatch(setTextFilter("RENT"))
// store.dispatch(setTextFilter())

// store.dispatch(sortByDate());


// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(40));
// store.dispatch(setEndDate());

const demoState = {
    expenses: [{
        id: "feiguleshges",
        description: "Trip to Amsterdam",
        note: "It was fun",
        amount: 50000,
        createdAt: 0
    }],
    filters: {
        text: "rent",
        sortBy: "amount", // date or amount
        startDate: undefined,
        endDate: undefined
    }
};