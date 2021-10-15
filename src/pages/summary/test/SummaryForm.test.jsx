import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

test("Initial conditions", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const confirmBtn = screen.getByRole("button", { name: /confirm order/i });
  expect(confirmBtn).toBeDisabled();
});

test("Checkbox disables button on first click, enables on second click", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmBtn = screen.getByRole("button", { name: /confirm order/i });

  userEvent.click(checkbox);
  expect(confirmBtn).toBeEnabled();

  userEvent.click(checkbox);
  expect(confirmBtn).toBeDisabled();
});

test("Popover responds to hover", async () => {
  render(<SummaryForm />);
  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  ); // use queryByText when expect to be null
  expect(nullPopover).not.toBeInTheDocument();
  // popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();
  // popover disappears on mouse out
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() => // element was thre and then disappeared
    screen.queryByText(/no ice cream will actually be delivered/i)
    // automatically expects it not toBeInTheDocument
  );
});
