import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";

// reducer
import reducers from "./reducers";

// containers
import App from "./App";

const store = applyMiddleware(promiseMiddleware)(createStore);

ReactDOM.render(
  <Provider store={store(reducers)}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
