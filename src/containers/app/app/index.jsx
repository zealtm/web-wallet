import React, { Component } from "react";
import Loadable from "react-loadable";
import path from "path";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

// COMPONENTS
import fakeDelay from "../../../components/fakeDelay";

function Loading({ error }) {
  if (error) {
    console.warn(error)
    return "Error!";
  } else {
    return <h3>Loading...</h3>;
  }
}

/* eslint-disable */
let home = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../home")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../home")
});

let wallet = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../wallet")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../wallet")
});

let errorNotFound = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../errors/404")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../errors/404")
});

let errorInternal = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../errors/500")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../errors/500")
});
/* eslint-enable */

class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route exact path="/wallet" component={wallet} />
          </Switch>
      </Router>
    );
  }
}

export default App;
