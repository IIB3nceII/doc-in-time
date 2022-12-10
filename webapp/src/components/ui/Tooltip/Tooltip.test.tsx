import React from "react";
import ReactTestRenderer from "react-test-renderer";
import { act } from "react-dom/test-utils";

import Tooltip from "./Tooltip";

describe("Tooltip", () => {
  it("should render the children elements", () => {
    const renderer = ReactTestRenderer.create(
      <Tooltip text="Some tooltip text">
        <p>Child element 1</p>
        <p>Child element 2</p>
      </Tooltip>
    );

    const root = renderer.root;

    // Expect the Tooltip to have two child elements
    expect(root.findAllByType("p").length).toEqual(2);
  });

  it("should display the tooltip when the user hovers over the element", () => {
    const renderer = ReactTestRenderer.create(
      <Tooltip text="Some tooltip text">
        <p>Hover over me</p>
      </Tooltip>
    );

    const root = renderer.root;

    // Simulate a hover event on the Tooltip
    act(() => {
      root.findByType("div", { className: "container" }).props.onMouseEnter();
    });
  });

  it("should hide the tooltip when the user moves the mouse away from the element", () => {
    const renderer = ReactTestRenderer.create(
      <Tooltip text="Some tooltip text">
        <p>Hover over me</p>
      </Tooltip>
    );

    const root = renderer.root;

    // Simulate a hover event on the Tooltip
    act(() => {
      root.findByType("div", { className: "container" }).props.onMouseEnter();
    });

    // Simulate a mouse leave event on the Tooltip
    act(() => {
      root.findByType("div", { className: "container" }).props.onMouseLeave();
    });
});

});

