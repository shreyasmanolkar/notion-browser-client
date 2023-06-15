/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import LeftSidebar from "../LeftSidebar";

describe("LeftSidebar", () => {
  beforeAll(() => {
    render(<LeftSidebar />);
  });

  it("should render leftSidebar jsx correctly", () => {
    const leftSidebar = screen.queryByTestId("left-sidebar");

    expect(leftSidebar).toBeInTheDocument();
  });
});
