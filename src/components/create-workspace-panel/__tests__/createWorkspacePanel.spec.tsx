/* eslint-disable jest-dom/prefer-to-have-value */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */

import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import CreateWorkspacePanel from "../CreateWorkspacePanel";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import { QueryClient, QueryClientProvider } from "react-query";
import EmojiSelector from "../EmojiSelector";

const queryClient = new QueryClient();

describe.skip("LoginPanel", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <CreateWorkspacePanel />
          <EmojiSelector
            openPicker={false}
            closePicker={() => {}}
            setEmoji={() => {}}
            setEmojiCode={() => {}}
          />
        </QueryClientProvider>
      </Provider>
    );
  });

  it("renders correctly", () => {
    const TitleHeading = screen.getByRole("heading", {
      level: 1,
    });
    const titleParagraphElement = screen.getByText(
      "Fill in some details for your teammates."
    );
    const chooseIconParagraphElement = screen.getByText("Choose icon");

    const workspaceNameLabelElement = screen.getByLabelText("Workspace name", {
      selector: "input",
    });
    const workspaceNameTextboxElement = screen.getByRole("textbox", {
      name: "Workspace name",
    });

    const submitButtonElement = screen.getByRole("button");

    expect(TitleHeading).toBeInTheDocument();
    expect(titleParagraphElement).toBeInTheDocument();
    expect(chooseIconParagraphElement).toBeInTheDocument();
    expect(workspaceNameLabelElement).toBeInTheDocument();
    expect(workspaceNameTextboxElement).toBeInTheDocument();
    expect(submitButtonElement).toBeInTheDocument();
  });

  it("should show error message when all the fields are not entered", async () => {
    const submitButtonElement = screen.getByRole("button", {
      name: /Continue/i,
    });

    await act(async () => {
      await userEvent.click(submitButtonElement);
    });

    const nameRequiredError = screen.getByText("Name is required!");

    expect(nameRequiredError).toBeInTheDocument();
  });

  it("should update name state on name input change", () => {
    const workspaceNameTextboxElement = screen.getByRole("textbox", {
      name: "Workspace name",
    }) as HTMLInputElement;

    fireEvent.change(workspaceNameTextboxElement, {
      target: { value: "office-workpsace" },
    });

    expect(workspaceNameTextboxElement.value).toBe("office-workpsace");
  });

  it("should handle successful creating workspace", async () => {
    const workspaceNameTextboxElement = screen.getByRole("textbox", {
      name: "Workspace name",
    }) as HTMLInputElement;

    const submitButtonElement = screen.getByRole("button", {
      name: /Continue/i,
    });

    fireEvent.change(workspaceNameTextboxElement, {
      target: { value: "office-workspace" },
    });

    await act(async () => {
      await userEvent.click(submitButtonElement);
    });

    const AfteSubmitWorkspaceNameTextboxElement = screen.getByRole("textbox", {
      name: "Workspace name",
    }) as HTMLInputElement;

    expect(AfteSubmitWorkspaceNameTextboxElement.value).toBe("");
  });

  it("should display default image if the emoji image is broken", () => {
    const imgElement = screen.getByAltText("emoji") as HTMLImageElement;

    fireEvent.error(imgElement);

    expect(imgElement.src).toContain(
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f30e.png"
    );
  });

  it("should open and close the emoji picker", () => {
    const emojiElement = screen.getByTestId("emoji");
    expect(emojiElement).toBeInTheDocument();
  });
});
