import React from "react"
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./components/App/index";
import store from "./store";

import "./input.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
