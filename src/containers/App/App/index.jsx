import React, { Component } from "react";
import Loadable from "react-loadable";
import path from "path";
import {
  Link,
  Route,
  Switch,
  BrowserRouter as Router
} from "react-router-dom";

// COMPONENTS
import fakeDelay from "../../../components/fakeDelay";

// STYLE
import style from "./style.css";


function Loading({ error }) {
  if (error) {
    return "Error!";
  } else {
    return <h3>Loading...</h3>;
  }
}

/* eslint-disable */
let home = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../Home")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../Home")
});

let wallet = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../Wallet")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../Wallet")
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

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Link className={style.link} to="/">Home</Link>
          <Link className={style.link} to="/wallet">Wallet</Link>

          <Switch>
            {/* INSIDE ROUTES */}
            <Route exact path="/" component={home} />
            <Route exact path="/home" component={home} />
            <Route exact path="/wallet" component={wallet} />

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

export default App;
