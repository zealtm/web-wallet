import React, { Component } from "react";
import Loadable from "react-loadable";
import fakeDelay from "../../../components/fakeDelay";
import path from "path";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";

function Loading({ error }) {
  if (error) {
    console.error(error);
    return "Error!";
  } else {
    return <h3>Loading...</h3>;
  }
}

/* eslint-disable */
let login = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../User/login")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../User/login")
});

let reset = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../User/reset")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../User/reset")
});

let create = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../User/create")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../User/create")
});

let errorNotFound = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../Errors/404")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../Errors/404")
});

let errorInternal = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../Errors/500")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../Errors/500")
});
/* eslint-enable */

class Login extends Component {
  render() {
    return (
      <Router>
        <div>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/reset">Reset</Link>
          <Link to="/create">Create</Link>

          <Switch>
            {/* INSIDE ROUTES */}
            <Route exact path="/" component={login} />
            <Route exact path="/login" component={login} />
            <Route exact path="/reset" component={reset} />
            <Route exact path="/create" component={create} />

            {/* ERRORS PAGE */}
            <Route path="/404" component={errorNotFound} />
            <Route path="/500" component={errorInternal} />
            <Route path={"**"} component={errorNotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Login;
