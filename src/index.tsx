import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import "./index.css";
import { store } from "./redux";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
