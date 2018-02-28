import {createStore} from "redux"

const incrementCount = ({ incrementBy = 1} = {}) => ({
        type: "INCREMENT",
        incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
        type: "DECREMENT",
        decrementBy
});

const setCount = ({newCount = 0} = {}) => ({
        type: "SET",
        newCount
});

const resetCount = () => ({
        type: "RESET"
});


const store = createStore((state = { count: 0 }, action) => {
    switch (action.type) {
        case "INCREMENT":
            return {
                count: state.count + action.incrementBy
            };
        case "DECREMENT":
            return {
                count: state.count - action.decrementBy
            };
        case "RESET":
            return {
                count: 0
            };
        case "SET":
            return {
                count: action.newCount
            };
        default:
            return state;
    }
});

store.dispatch(incrementCount({ incrementBy: 5}))

console.log(store.getState());

store.dispatch(decrementCount({ decrementBy: 3}))

console.log(store.getState());

store.dispatch(resetCount())

console.log(store.getState());

store.dispatch(setCount({newCount: 69}))
console.log(store.getState());
