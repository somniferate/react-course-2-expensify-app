import { login, startLogin, logout, startLogout } from "../../actions/auth"

test("expect login to return correct type", () => {
    const uid = "ABC1234"
    const action = login(uid);
    expect(action).toEqual({
        type:"LOGIN",
        uid
    })
}) 

test("expect logout to return correct type", () => {
    const action = logout();
    expect(action).toEqual({
        type:"LOGOUT",
    })
}) 