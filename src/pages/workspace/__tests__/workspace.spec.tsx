/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import Workspace from "../Workspace";
import { SidebarLogicProvider } from "../../../context/SidebarContext";
import { ThemeProvider } from "../../../context/ThemeContext";
import { store } from "../../../app/store";
import { Provider } from "react-redux";

describe.skip("workspace", () => {
  beforeAll(() => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <SidebarLogicProvider>
            <Workspace />
          </SidebarLogicProvider>
        </ThemeProvider>
      </Provider>
    );
  });

  it("should render workspace jsx correctly", () => {
    const workspace = screen.queryByTestId("workspace");

    expect(workspace).toBeInTheDocument();
  });
});
