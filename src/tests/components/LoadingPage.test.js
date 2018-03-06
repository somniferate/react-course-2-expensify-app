import React from "react"
import { shallow } from "enzyme"
import LoadingPage from "../../components/LoadingPage"

test("expect loading page to render correctly", () => {
    const wrapper = shallow(<LoadingPage />)
    expect(shallow).toMatchSnapshot();
})