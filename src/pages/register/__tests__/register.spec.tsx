import Register from "../Register";
import { render, screen } from "@testing-library/react";

describe("Register", () => {
  it("renders correctly", () => {
    render(<Register />);

    const notionLogo = screen.queryByTestId("notion-logo");
    const textElement = screen.getByText("Notion");
    const registerHeading = screen.getByRole("heading", {
      level: 1,
    });
    const nameLabelElement = screen.getByLabelText("Name", {
      selector: "input",
    });
    const nameTextboxElement = screen.getByRole("textbox", {
      name: "Name",
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
    const textElement2 = screen.getByText("Already have an account?");
    const createNewAccoutLinkElement = screen.getByRole("link", {
      name: "Login",
    });

    expect(notionLogo).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
    expect(registerHeading).toBeInTheDocument();
    expect(emailLabelElement).toBeInTheDocument();
    expect(emailTextboxElement).toBeInTheDocument();
    expect(nameLabelElement).toBeInTheDocument();
    expect(nameTextboxElement).toBeInTheDocument();
    expect(passwordlabelElement).toBeInTheDocument();
    expect(passwordTextboxElement).toBeInTheDocument();
    expect(submitButtonElement).toBeInTheDocument();
    expect(textElement2).toBeInTheDocument();
    expect(createNewAccoutLinkElement).toBeInTheDocument();
  });
});
