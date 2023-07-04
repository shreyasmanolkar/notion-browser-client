/* eslint-disable jest-dom/prefer-to-have-value */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */

import { QueryClient, QueryClientProvider } from "react-query";
import Register from "../Register";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../app/store";

const queryClient = new QueryClient();

describe.skip("Register", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Register />
        </QueryClientProvider>
      </Provider>
    );
  });

  it("should render register jsx correctly", () => {
    const notionLogo = screen.queryByTestId("notion-logo");
    const textElement = screen.getByText("Notion");

    expect(notionLogo).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });
});
