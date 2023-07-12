import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "./context/ThemeContext";
import { ReactQueryProvider } from "./provider/reactQueryProvider";
// import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import { NewPageContextProvider } from "./context/NewPageContext";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReactQueryProvider>
        <Provider store={store}>
          <ThemeProvider>
            <NewPageContextProvider>
              <App />
            </NewPageContextProvider>
          </ThemeProvider>
          {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
        </Provider>
      </ReactQueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
