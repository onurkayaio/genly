import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// containers.
import Home from "./containers/home";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/test" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
