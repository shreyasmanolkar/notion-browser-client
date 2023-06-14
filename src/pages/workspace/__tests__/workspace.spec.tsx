/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import Workspace from "../Workspace";

describe("workspace", () => {
  beforeAll(() => {
    render(<Workspace />);
  });

  it("should render workspace jsx correctly", () => {
    const workspace = screen.queryByTestId("workspace");

    expect(workspace).toBeInTheDocument();
  });
});
