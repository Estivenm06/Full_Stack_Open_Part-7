import { createRoot } from "react-dom/client";
import App from "./App";
import store from "../reducers/store";
import { Provider } from "react-redux";
import React from "react";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
