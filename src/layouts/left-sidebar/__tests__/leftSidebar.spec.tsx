/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import LeftSidebar from "../LeftSidebar";
import { SidebarLogicProvider } from "../../../context/SidebarContext";
import { ThemeProvider } from "../../../context/ThemeContext";
import { store } from "../../../app/store";
import { Provider } from "react-redux";

describe.skip("LeftSidebar", () => {
  beforeAll(() => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <SidebarLogicProvider>
            <LeftSidebar />
          </SidebarLogicProvider>
        </ThemeProvider>
      </Provider>
    );
  });

  it("should render leftSidebar jsx correctly", () => {
    const leftSidebar = screen.queryByTestId("left-sidebar");

    expect(leftSidebar).toBeInTheDocument();
  });
});
