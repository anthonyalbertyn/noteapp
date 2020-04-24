import React from "react";
import { shallow, mount, render } from "../enzyme";
import SelectColor from "./SelectColor";

describe("SelectColor Component", () => {
  const PROPS = {
    selectedColorId: "blue",
    selectColorCallback: () => {},
  };

  it("renders the SelectColor component", () => {
    const wrapper = shallow(<SelectColor {...PROPS} />);
    expect(wrapper.find("#select-color").exists()).toBe(true);
  });

  it("sets the correct active color", () => {
    const wrapper = mount(<SelectColor {...PROPS} />);
    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);
    expect(input.props().value).toBe("blue");
  });
});
