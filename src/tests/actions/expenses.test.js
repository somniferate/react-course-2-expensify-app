import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { 
  startAddExpense, 
  addExpense, 
  startEditExpense,
  editExpense, 
  startRemoveExpense,
  removeExpense, 
  startSetExpenses,
  setExpenses
} from '../../actions/expenses';
import expenses from "../fixtures/expenses"
import database from "../../firebase/firebase"

const uid = "ABC123"
const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, amount, note, createdAt }) => {
    expensesData[id] = { description, amount, note, createdAt }
  })
  database.ref(`users/${uid}/expenses/`).set(expensesData).then(() => done())
})

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test("should remove expense from firebase and redux if valid id provided", (done) => {
  const store = createMockStore({ auth: { uid }});
  const id = expenses[1].id;

  store.dispatch(startRemoveExpense({ id })).then(() => {
    const action = store.getActions();
    expect(action[0]).toEqual({
      type:"REMOVE_EXPENSE",
      id
    })
    return database.ref(`users/${uid}/expenses/${id}`).once("value")
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy()
    done();
  })
})



test('should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'New note value' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    update: {
      note: 'New note value'
    }
  });
});

test("startEditExpense should dispatch update to firebase", (done) => {
  const store = createMockStore({ auth: { uid } });
  const id = expenses[0].id
  const update = {
    description: expenses[0].description,
    createdAt:6800,
    amount:5000,
    note: "Added a note"
  }
  store.dispatch(startEditExpense(id, update)).then(() => {
    const action = store.getActions();
    
    expect(action[0]).toEqual({
      type:"EDIT_EXPENSE",
      update,
      id
    });
    return database.ref(`users/${uid}/expenses/${id}`).once("value")
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(update);
    done();
  })
})


test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

test('should dispatch new expense to firebase and redux with provided values', (done) => {
  const store = createMockStore({ auth: { uid } })
  const expenseData = {
    description: "kittens",
    amount: 4000,
    createdAt: 1000,
    note: "so fluffy"
  }

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once("value");
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should dispatch new expense to firebase and redux with default values', (done) => {
  const store = createMockStore({ auth: { uid } })
  const expenseData = {
    description: "",
    note: "",
    amount: 0,
    createdAt: 0
  }

  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once("value");
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test("SET_EXPENSES should return with correct type and data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type:"SET_EXPENSES",
    expenses
  });
});

test("startSetExpenses should return fixtures expenses", (done) => {
  const store = createMockStore({ auth: { uid } })
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses
    })
    done();
  })
});

test("startSetExpenses should return no data if no expenses", (done) => {
  const store = createMockStore({ auth: { uid }})
  database.ref(`users/${uid}/expenses`).set("").then(() => {
    return store.dispatch(startSetExpenses())
  }).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses: []
    })
    done();
  })
  
});

// test('should setup add expense action object with default values', () => {
//   const action = addExpense({});
//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//       id: expect.any(String),
//       description: '',
//       note: '',
//       amount: 0,
//       createdAt: 0
//     }
//   });
// });
