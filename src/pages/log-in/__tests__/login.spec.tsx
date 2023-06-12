import LogIn from "../LogIn";
import { render, screen } from "@testing-library/react";

describe("Login", () => {
  it("renders correctly", () => {
    render(<LogIn />);

    const notionLogo = screen.queryByTestId("notion-logo");
    const textElement = screen.getByText("Notion");
    const loginHeading = screen.getByRole("heading", {
      level: 1,
    });
    const emailLabelElement = screen.getByLabelText("Email", {
      selector: "input",
    });
    const emailTextboxElement = screen.getByRole("textbox", {
      name: "Email",
    });
    const passwordlabelElement = screen.getByLabelText("Password", {
      selector: "input",
    });
    const passwordTextboxElement = screen.getByLabelText("Password");
    const submitButtonElement = screen.getByRole("button");
    const createNewAccoutLinkElement = screen.getByRole("link", {
      name: "Create New Account",
    });

    expect(notionLogo).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
    expect(loginHeading).toBeInTheDocument();
    expect(emailLabelElement).toBeInTheDocument();
    expect(emailTextboxElement).toBeInTheDocument();
    expect(passwordlabelElement).toBeInTheDocument();
    expect(passwordTextboxElement).toBeInTheDocument();
    expect(submitButtonElement).toBeInTheDocument();
    expect(createNewAccoutLinkElement).toBeInTheDocument();
  });
});
