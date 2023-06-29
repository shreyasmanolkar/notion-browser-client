/* eslint-disable jest-dom/prefer-to-have-value */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */

import { QueryClient, QueryClientProvider } from "react-query";
import RegisterPanel from "../RegisterPanel";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { GenerateProfilePicture } from "../../../utils/generateProfilePicture";
import { server } from "../../../mocks/server";
import { rest } from "msw";

const queryClient = new QueryClient();

describe.skip("RegisterPanel", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RegisterPanel />
        </QueryClientProvider>
      </Provider>
    );
  });

  it("should render register jsx correctly", () => {
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

  it("should show error message when all the fields are not entered", async () => {
    const submitButtonElement = screen.getByRole("button", {
      name: /Sign up/i,
    });

    await act(async () => {
      await userEvent.click(submitButtonElement);
    });

    const nameRequiredError = screen.getByText("Name is required!");
    const emailRequiredError = screen.getByText("Email is required!");
    const passwordRequiredError = screen.getByText("Password is required!");

    expect(nameRequiredError).toBeInTheDocument();
    expect(emailRequiredError).toBeInTheDocument();
    expect(passwordRequiredError).toBeInTheDocument();
  });

  it("should update name state on name input change", () => {
    const nameTextboxElement = screen.getByRole("textbox", {
      name: "Name",
    }) as HTMLInputElement;

    fireEvent.change(nameTextboxElement, { target: { value: "John Doe" } });

    expect(nameTextboxElement.value).toBe("John Doe");
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
    jest
      .spyOn(GenerateProfilePicture, "createImageFromInitials")
      .mockImplementationOnce(() => {
        return "data:img//sample-url";
      });

    const nameTextboxElement = screen.getByRole("textbox", {
      name: "Name",
    }) as HTMLInputElement;

    const emailTextboxElement = screen.getByRole("textbox", {
      name: "Email",
    }) as HTMLInputElement;

    const passwordTextboxElement = screen.getByLabelText(
      "Password"
    ) as HTMLInputElement;

    const submitButtonElement = screen.getByRole("button", {
      name: /Sign up/i,
    });

    fireEvent.change(nameTextboxElement, { target: { value: "John Doe" } });

    fireEvent.change(emailTextboxElement, {
      target: { value: "JohnDoe@gmail.com" },
    });

    fireEvent.change(passwordTextboxElement, {
      target: { value: "12345678" },
    });

    await act(async () => {
      await userEvent.click(submitButtonElement);
    });

    expect(GenerateProfilePicture.createImageFromInitials).toHaveBeenCalled();
  });

  it("should handle registration error", async () => {
    server.use(
      rest.post("http://localhost:5000/v1/register", (req, res, ctx) => {
        return res(
          ctx.status(409),
          ctx.json({
            error: "Email is already in use",
          })
        );
      })
    );

    const nameTextboxElement = screen.getByRole("textbox", {
      name: "Name",
    }) as HTMLInputElement;

    const emailTextboxElement = screen.getByRole("textbox", {
      name: "Email",
    }) as HTMLInputElement;

    const passwordTextboxElement = screen.getByLabelText(
      "Password"
    ) as HTMLInputElement;

    const submitButtonElement = screen.getByRole("button", {
      name: /Sign up/i,
    });

    fireEvent.change(nameTextboxElement, { target: { value: "John Doe" } });

    fireEvent.change(emailTextboxElement, {
      target: { value: "JohnDoe@gmail.com" },
    });

    fireEvent.change(passwordTextboxElement, {
      target: { value: "12345678" },
    });

    await act(async () => {
      await userEvent.click(submitButtonElement);
    });

    const emailInUseError = await screen.findByText((content, element) =>
      content.startsWith("Email is already in use")
    );

    expect(emailInUseError).toBeInTheDocument();
  });
});
