/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import RightSidebar from "../RightSidebar";

describe("RightSidebar", () => {
  beforeAll(() => {
    render(<RightSidebar />);
  });

  it("should render rightSidebar jsx correctly", () => {
    const rightSidebar = screen.queryByTestId("right-sidebar");

    expect(rightSidebar).toBeInTheDocument();
  });
});
