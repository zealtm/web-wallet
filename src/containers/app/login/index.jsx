import React, { Component } from "react";
import { connect } from "react-redux";
import Loadable from "react-loadable";
import path from "path";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import i18n from "../../../utils/i18n";

// COMPONENTS
import fakeDelay from "../../../components/fakeDelay";
import Carousel from "../../../components/carousel/carousel";
import ModalBar from "../../../components/modalBar";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

// STYLE
import style from "./style.css";

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
  loader: () => fakeDelay(400).then(() => import("../../user/login/login")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../user/login/login")
});

let reset = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../user/reset/reset")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../user/reset/reset")
});

let create = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../user/create/create")),
  loading: Loading,
  serverSideRequirePath: path.resolve(__dirname, "../../user/create/create")
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

const imagePath = "/images/carousel/";

const carouselSteps = [
  {
    label: i18n.t("LOGIN_SLIDE_DESCRIPTION_1"),
    imgPath: imagePath + "carousel-01.png"
  },
  {
    label: i18n.t("LOGIN_SLIDE_DESCRIPTION_2"),
    imgPath: imagePath + "/carousel-02.png"
  },
  {
    label: i18n.t("LOGIN_SLIDE_DESCRIPTION_3"),
    imgPath: imagePath + "/carousel-03.png"
  }
];

const maxDots = carouselSteps.length;


class Login extends Component {
  constructor() {
    super();
  }

  render() {
    const { error } = this.props;

    return (
      <Router>
        <Switch>
          {/* CONTAINER OF VIEWS */}
          <Grid container>
            <div>
              {error.active ? <ModalBar type={error.type} message={error.message} timer /> : null}
            </div>
            <Grid item xs={12} sm={5} md={5} className={style.colRight}>
              {/* INSIDE ROUTES */}
              <Route exact path="/" component={login} />
              <Route exact path="/login" component={login} />
              <Route exact path="/reset" component={reset} />
              <Route exact path="/create" component={create} />
            </Grid>

            <Hidden xsDown>
              <Grid item sm={7} md={7} className={style.colLeft}>
                <Carousel imageSteps={carouselSteps} maxDot={maxDots} />
              </Grid>
            </Hidden>
          </Grid>

          <Route path="/404" component={errorNotFound} />
          <Route path="/500" component={errorInternal} />
          <Route path={"**"} component={errorNotFound} />
        </Switch>
      </Router>
    );
  }
}


const mapSateToProps = store => ({
  error: store.error.message,
  user: store.user
});

export default connect(mapSateToProps)(Login);
