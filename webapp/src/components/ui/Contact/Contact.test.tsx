import React from "react";
import { render } from "@testing-library/react";
import Contact from "./Contact";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

test("renders contact information", () => {
  const { getByText } = render(<Contact />);

  expect(getByText("contact.title")).toBeInTheDocument();
  expect(getByText("+361000000")).toBeInTheDocument();
  expect(getByText("info@docintime.com")).toBeInTheDocument();
});
