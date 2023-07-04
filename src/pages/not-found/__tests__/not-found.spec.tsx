/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import NotFound from "../NotFound";

describe.skip("NotFound", () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  it("renders correctly", () => {
    const notionLogo = screen.queryByTestId("notion-logo");
    const notionTextElement = screen.getByText("Notion");
    const eyesIcon = screen.queryByTestId("eyes-icon");
    const titleTextElement = screen.getByText("This content does not exist");
    const backButtonElement = screen.getByRole("button");

    expect(notionLogo).toBeInTheDocument();
    expect(notionTextElement).toBeInTheDocument();
    expect(eyesIcon).toBeInTheDocument();
    expect(titleTextElement).toBeInTheDocument();
    expect(backButtonElement).toBeInTheDocument();
  });
});
