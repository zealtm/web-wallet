import React, { Component } from "react";
import Loadable from "react-loadable";
import path from "path";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

// COMPONENTS
import fakeDelay from "../../../components/fakeDelay";
import Loading from "../../../components/loading";
import Skeleton from "../../skeleton";

function loading({ error }) {
  if (error) {
    console.warn(error);
    return "Error!";
  } else {
    return <Loading />;
  }
}

/* eslint-disable */
let home = Loadable({
  loader: () => fakeDelay(0).then(() => import("../../home")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../home")
});

let wallet = Loadable({
  loader: () => fakeDelay(0).then(() => import("../../wallet")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../wallet")
});

let errorNotFound = Loadable({
  loader: () => fakeDelay(0).then(() => import("../../errors/404")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../errors/404")
});

let errorInternal = Loadable({
  loader: () => fakeDelay(0).then(() => import("../../errors/500")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../errors/500")
});
/* eslint-enable */

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Skeleton>
            <Switch>
              {/* INSIDE ROUTES */}
              <Route exact path="/" component={home} />
              <Route path="/home" component={home} />
              <Route path="/wallet" component={wallet} />

              {/* ERRORS PAGE */}
              <Route path="/404" component={errorNotFound} />
              <Route path="/500" component={errorInternal} />
              <Route path={"**"} component={errorNotFound} />
            </Switch>
          </Skeleton>
        </div>
      </Router>
    );
  }
}

export default App;
