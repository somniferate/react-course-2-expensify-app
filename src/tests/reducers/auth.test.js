import authReducer from "../../reducers/auth";

test ("testing login reducer", () => {
    const uid = "xxxyyy"
    const action = {
        type:"LOGIN",
        uid
    }
    const state = authReducer(undefined, action);
    expect(state).toEqual({uid});
});

test ("testing default values of reducer", () => {
    const oldState = {
        uid: "xxxyyy"
    }
    const action = {
        type:"LOGOUT"
    }
    const state = authReducer(oldState, action);
    expect(state).toEqual({});
});