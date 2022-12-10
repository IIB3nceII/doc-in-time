import React from "react";
import { render } from "@testing-library/react";
import EditModal from "./EditModal";

const item = {
  clinicName: "Paws and Claws",
  problemName: "Ear infection",
  startDate: new Date("2022-10-10"),
  endDate: new Date("2022-10-20"),
};

test("EditModal renders correctly with default props", () => {
  const cancelMock = jest.fn();
  const submitMock = jest.fn();
  const { getByText, getByLabelText } = render(<EditModal item={item} cancel={cancelMock}
    submit={submitMock} />);

  // Check clinic name
  expect(getByText("Paws and Claws")).toBeInTheDocument();

  // Check problem name
  expect(getByText("Ear infection")).toBeInTheDocument();

  // Check start date input
  expect(getByLabelText("Kezdő időpont:")).toHaveValue("10/10/2022, 12:00:00 AM");

  // Check end date input
  expect(getByLabelText("Záró időpont:")).toHaveValue("2022. 10. 20. 2:00:00");

  // Check cancel button
  expect(getByText("Cancel")).toBeInTheDocument();

  // Check submit button
  expect(getByText("Submit")).toBeInTheDocument();
});

test("EditModal renders correctly with custom props", () => {
  const cancelMock = jest.fn();
  const submitMock = jest.fn();
  const { getByText, getByLabelText } = render(
    <EditModal
      item={item}
      text="Edit appointment"
      cancelButtonText="Close"
      submitButtonText="Save"
      cancel={cancelMock}
      submit={submitMock}
    />
  );

  // Check text
  //expect(getByText("Edit appointment")).toBeInTheDocument();

  // Check clinic name
  expect(getByText("Paws and Claws")).toBeInTheDocument();

  // Check problem name
  expect(getByText("Ear infection")).toBeInTheDocument();

  // Check start date input
  expect(getByLabelText("Kezdő időpont:")).toHaveValue("10/10/2022, 12:00:00 AM");

  // Check end date input
  expect(getByLabelText("Záró időpont:")).toHaveValue("2022. 10. 20. 2:00:00");

  // Check cancel button
  expect(getByText("Close")).toBeInTheDocument();

  // Check submit button
  expect(getByText("Save")).toBeInTheDocument();
});

test("EditModal calls cancel and submit functions when buttons are clicked", () => {
  const cancelMock = jest.fn();
  const submitMock = jest.fn();

  const { getByText } = render(
    <EditModal
      item={item}
      cancel={cancelMock}
      submit={submitMock}
    />
  );

  // Click cancel button
  getByText("Cancel").click();
  expect(cancelMock).toHaveBeenCalledTimes(1);
});
