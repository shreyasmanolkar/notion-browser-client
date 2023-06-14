/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import RightSidebar from "../RightSidebar";

describe("RightSidebar", () => {
  beforeAll(() => {
    const mockToggleSidebar = jest.fn();

    render(
      <RightSidebar
        rightOpen={true}
        toggleSidebar={mockToggleSidebar}
        rightPanelContent={null}
      />
    );
  });

  it("should render rightSidebar jsx correctly", () => {
    const rightSidebar = screen.queryByTestId("right-sidebar");

    expect(rightSidebar).toBeInTheDocument();
  });
});
