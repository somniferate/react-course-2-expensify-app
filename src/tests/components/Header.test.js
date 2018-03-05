import React from "react"
import { shallow } from "enzyme";
import {Header} from "../../components/Header"

const startLogout = jest.fn()

test("should render header correctly", () => {
    const wrapper = shallow(<Header startLogout={startLogout}/>)
    expect(wrapper).toMatchSnapshot()
})

test("on logout button click, start Logout function should be called", () => {
    const wrapper = shallow(<Header startLogout={startLogout}/>)
    wrapper.find("button").simulate("click");
    expect(startLogout).toHaveBeenCalled()
})