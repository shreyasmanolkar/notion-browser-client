/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import LeftSidebar from "../LeftSidebar";

describe("LeftSidebar", () => {
  beforeAll(() => {
    const mockToggleSidebar = jest.fn();

    render(<LeftSidebar leftOpen={true} toggleSidebar={mockToggleSidebar} />);
  });

  it("should render leftSidebar jsx correctly", () => {
    const leftSidebar = screen.queryByTestId("left-sidebar");

    expect(leftSidebar).toBeInTheDocument();
  });
});
