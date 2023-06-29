/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import PageDisplay from "../PageDisplay";

describe.skip("PageDisplay", () => {
  beforeAll(() => {
    render(<PageDisplay />);
  });

  it("should render pageDisplay jsx correctly", () => {
    const pageDisplay = screen.queryByTestId("page-display");

    expect(pageDisplay).toBeInTheDocument();
  });
});
