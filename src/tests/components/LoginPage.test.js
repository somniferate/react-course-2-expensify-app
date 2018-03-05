import { shallow } from "enzyme";
import React from "react";
import { LoginPage } from "../../components/LoginPage";

const startLogin = jest.fn()
test("renders login page correctly", () => {
    const wrapper = shallow(<LoginPage startLogin={startLogin}/>);
    expect(wrapper).toMatchSnapshot();
});

test("on login button click, startLogin function should be called", () => {
    const wrapper = shallow(<LoginPage startLogin={startLogin}/>)
    wrapper.find("button").simulate("click");
    expect(startLogin).toHaveBeenCalled()
})