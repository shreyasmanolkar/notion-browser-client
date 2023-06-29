/* eslint-disable jest-dom/prefer-to-have-value */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */

import { Provider } from "react-redux";
import LoginPanel from "../LoginPanel";
import { fireEvent, render, screen } from "@testing-library/react";
import { store } from "../../../app/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { JWTParser } from "../../../utils/parseJWT";
import { server } from "../../../mocks/server";
import { rest } from "msw";

const queryClient = new QueryClient();

describe.skip("LoginPanel", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <LoginPanel />
        </QueryClientProvider>
      </Provider>
    );
  });

  it("renders correctly", () => {
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

    expect(loginHeading).toBeInTheDocument();
    expect(emailLabelElement).toBeInTheDocument();
    expect(emailTextboxElement).toBeInTheDocument();
    expect(passwordlabelElement).toBeInTheDocument();
    expect(passwordTextboxElement).toBeInTheDocument();
    expect(submitButtonElement).toBeInTheDocument();
    expect(createNewAccoutLinkElement).toBeInTheDocument();
  });

  it("should show error message when all the fields are not entered", async () => {
    const submitButtonElement = screen.getByRole("button", {
      name: /Log in/i,
    });

    await act(async () => {
      await userEvent.click(submitButtonElement);
    });

    const emailRequiredError = screen.getByText("Email is required!");
    const passwordRequiredError = screen.getByText("Password is required!");

    expect(emailRequiredError).toBeInTheDocument();
    expect(passwordRequiredError).toBeInTheDocument();
  });

  it("should update email state on email input change", () => {
    const emailTextboxElement = screen.getByRole("textbox", {
      name: "Email",
    }) as HTMLInputElement;

    fireEvent.change(emailTextboxElement, {
      target: { value: "JohnDoe@gmail.com" },
    });

    expect(emailTextboxElement.value).toBe("JohnDoe@gmail.com");
  });

  it("should update password state on password input change", () => {
    const passwordTextboxElement = screen.getByLabelText(
      "Password"
    ) as HTMLInputElement;

    fireEvent.change(passwordTextboxElement, {
      target: { value: "12345678" },
    });

    expect(passwordTextboxElement.value).toBe("12345678");
  });

  it("should handle successful registration", async () => {
    jest.spyOn(JWTParser, "parseJWT").mockImplementation(() => {
      return {
        userId: "6484948671881548f7c268bb",
      };
    });

    const emailTextboxElement = screen.getByRole("textbox", {
      name: "Email",
    }) as HTMLInputElement;

    const passwordTextboxElement = screen.getByLabelText(
      "Password"
    ) as HTMLInputElement;

    const submitButtonElement = screen.getByRole("button", {
      name: /Log in/i,
    });

    fireEvent.change(emailTextboxElement, {
      target: { value: "JohnDoe@gmail.com" },
    });

    fireEvent.change(passwordTextboxElement, {
      target: { value: "12345678" },
    });

    await act(async () => {
      await userEvent.click(submitButtonElement);
    });

    expect(JWTParser.parseJWT).toHaveBeenCalled();
  });

  it("should handle registration error", async () => {
    server.use(
      rest.post("http://localhost:5000/v1/login", (req, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({
            error: "Invalid User",
          })
        );
      })
    );

    const emailTextboxElement = screen.getByRole("textbox", {
      name: "Email",
    }) as HTMLInputElement;

    const passwordTextboxElement = screen.getByLabelText(
      "Password"
    ) as HTMLInputElement;

    const submitButtonElement = screen.getByRole("button", {
      name: /Log in/i,
    });

    fireEvent.change(emailTextboxElement, {
      target: { value: "JohnDoe@gmail.com" },
    });

    fireEvent.change(passwordTextboxElement, {
      target: { value: "12345678" },
    });

    await act(async () => {
      await userEvent.click(submitButtonElement);
    });

    const invalidUserError = await screen.findByText((content, element) =>
      content.startsWith("Invalid User")
    );

    expect(invalidUserError).toBeInTheDocument();
  });
});
