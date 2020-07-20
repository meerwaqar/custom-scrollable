import React from "react";
import { render } from "@testing-library/react";

import List from "../List";

test("Renders List component", () => {
  const { debug } = render(<List data={[1, 2, 3, 4, 5, 6, 7]} />);
});

test("Renders Vertical list by-default", () => {
    const { container } = render(<List data={[1,2,3]}/>);

    const listItems = container.getElementsByClassName("vertical");
    expect(listItems.length).toBeGreaterThan(0);
});

test("Renders horizontal list", () => {
    const { container } = render(<List orientation="horizontal" data={[1,2,3]}/>);

    const listItemsVertical = container.getElementsByClassName("vertical");
    const listItemsHoarizontal = container.getElementsByClassName("horizontal");
    
    expect(listItemsVertical.length).toBeLessThanOrEqual(0);
    expect(listItemsHoarizontal.length).toBeGreaterThan(0);
});
