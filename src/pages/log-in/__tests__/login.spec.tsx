/* eslint-disable jest-dom/prefer-to-have-value */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */

import { Provider } from "react-redux";
import LogIn from "../LogIn";
import { render, screen } from "@testing-library/react";
import { store } from "../../../app/store";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

describe.skip("Login", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <LogIn />
        </QueryClientProvider>
      </Provider>
    );
  });

  it("renders correctly", () => {
    const notionLogo = screen.queryByTestId("notion-logo");
    const textElement = screen.getByText("Notion");

    expect(notionLogo).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });
});
