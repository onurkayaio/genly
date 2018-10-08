import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promiseMiddleware from "redux-promise";

// reducer
import reducers from "./reducers";

// containers
import Home from "./containers/home/home";
import Dashboard from "./containers/dashboard/dashboard";

const store = applyMiddleware(promiseMiddleware)(createStore);

ReactDOM.render(
  <Provider store={store(reducers)}>
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
