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
import style from "../style.css";


function Loading({ error }) {
  if (error) {
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
