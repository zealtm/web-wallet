// import React, { Component } from "react";
// import Loadable from "react-loadable";
// import path from "path";
// import PropTypes from "prop-types";
// import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
// import { connect } from "react-redux";
// import i18n from "../../../utils/i18n";

// // COMPONENTS
// import Loading from "../../../components/loading";
// import fakeDelay from "../../../components/fakeDelay";
// import Carousel from "../../../components/carousel/carousel";
// import ModalBar from "../../../components/modalBar";

// // MATERIAL UI
// import Grid from "@material-ui/core/Grid";
// import Hidden from "@material-ui/core/Hidden";

// // STYLE
// import style from "../style.css";

// function Transition({ error }) {
//   if (error) {
//     return "Error!";
//   } else {
//     return <Loading color="lunes" width="35px" />;
//   }
// }

// /* eslint-disable */
// let login = Loadable({
//   loader: () => fakeDelay(400).then(() => import("../../user/login")),
//   loading: Transition,
//   serverSideRequirePath: path.resolve(__dirname, "../../user/login")
// });

// let reset = Loadable({
//   loader: () => fakeDelay(400).then(() => import("../../user/reset")),
//   loading: Transition,
//   serverSideRequirePath: path.resolve(__dirname, "../../user/reset")
// });

// let resetNewPassword = Loadable({
//   loader: () =>
//     fakeDelay(400).then(() => import("../../user/reset/newPassword")),
//   loading: Transition,
//   serverSideRequirePath: path.resolve(__dirname, "../../user/reset/newPassword")
// });

// let create = Loadable({
//   loader: () => fakeDelay(400).then(() => import("../../user/create")),
//   loading: Transition,
//   serverSideRequirePath: path.resolve(__dirname, "../../user/create")
// });

// let errorNotFound = Loadable({
//   loader: () => fakeDelay(400).then(() => import("../../errors/404")),
//   loading: Transition,
//   serverSideRequirePath: path.resolve(__dirname, "../../errors/404")
// });

// let errorInternal = Loadable({
//   loader: () => fakeDelay(400).then(() => import("../../errors/500")),
//   loading: Transition,
//   serverSideRequirePath: path.resolve(__dirname, "../../errors/500")
// });
// /* eslint-enable */

// const imagePath = "/images/carousel/";

// const carouselSteps = [
//   {
//     label: i18n.t("LOGIN_SLIDE_DESCRIPTION_1"),
//     imgPath: imagePath + "Slider-Boleto.png"
//   },
//   {
//     label: i18n.t("LOGIN_SLIDE_DESCRIPTION_2"),
//     imgPath: imagePath + "/Slider-TED.png"
//   },
//   {
//     label: i18n.t("LOGIN_SLIDE_DESCRIPTION_3"),
//     imgPath: imagePath + "/Slider-Recarga.png"
//   },
//   {
//     label: i18n.t("LOGIN_SLIDE_DESCRIPTION_4"),
//     imgPath: imagePath + "/Slider-Wallet.png"
//   }
// ];

// const maxDots = carouselSteps.length;

// class Login extends Component {
//   constructor() {
//     super();
//     this.state = {
//       newPassword: false
//     };
//   }

//   componentDidMount() {
//     this.newPasswordAuth();
//   }

//   newPasswordAuth = () => {
//     let newPassword = true;
//     if (newPassword) {
//       this.setState({ newPassword: true });
//     }

//     return;
//   };

//   render() {
//     const { error } = this.props;

//     return (
//       <Router>
//         <div>
//           <Grid container>
//             <div>
//               {error.active ? (
//                 <ModalBar type={error.type} message={error.message} timer />
//               ) : null}
//             </div>
//             <Grid item xs={12} sm={12} md={5} className={style.colLeft}>
//               <Switch>
//                 {/* INSIDE ROUTES */}
//                 <Route exact path="/" component={login} />
//                 <Route exact path="/login" component={login} />
//                 <Route exact path="/reset" component={reset} />
//                 <Route exact path="/create" component={create} />
//                 {/* ERRORS PAGE */}
//                 <Route path="/404" component={errorNotFound} />
//                 <Route path="/500" component={errorInternal} />
//                 <Route path={"**"} component={login} />
//               </Switch>
//             </Grid>

//             <Hidden smDown>
//               <Grid item md={7} className={style.colRight}>
//                 <Carousel imageSteps={carouselSteps} maxDot={maxDots} />
//               </Grid>
//             </Hidden>
//           </Grid>
//         </div>
//       </Router>
//     );
//   }
// }

// Login.propTypes = {
//   error: PropTypes.object
// };

// const mapSateToProps = store => ({
//   error: store.error.message
// });

// export default connect(mapSateToProps)(Login);

import React, { Component } from "react";
import { connect } from "react-redux";
import Loadable from "react-loadable";
import path from "path";
import PropTypes from "prop-types";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

// COMPONENTS
import fakeDelay from "../../../components/fakeDelay";
import Loading from "../../../components/loading";
import Skeleton from "../../skeleton";
import ModalBar from "../../../components/modalBar";

function loading({ error }) {
  if (error) {
    return "Error!";
  } else {
    return <Loading color="wallet" height="80vh" width="100px" />;
  }
}

/* eslint-disable */
let home = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../home")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../home")
});

let wallet = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../wallet")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../wallet")
});

let leasing = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../leasing")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../leasing")
});

let coupons = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../coupons")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../coupons")
});

let settings = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../settings")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../settings")
});

let user = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../settings/user")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../settings/user")
});

let security = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../settings/security")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../settings/security")
});

let walletSettings = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../settings/wallet")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../settings/wallet")
});

let definitions = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../settings/definitions")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../settings/definitions")
});

let consent = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../settings/consent")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../settings/consent")
});

let payment = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../payment")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../payment")
});

let ted = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../ted")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../ted")
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

let assets = Loadable({
  loader: () => fakeDelay(0).then(() => import("../../assets")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../assets")
});
/* eslint-enable */

class App extends Component {
  render() {
    const { error } = this.props;
    return (
      <Router>
        <div>
          <div>
            {error.active ? (
              <ModalBar type={error.type} message={error.message} timer />
            ) : null}
          </div>
          <Skeleton>
            <Switch>
              {/* INSIDE ROUTES */}
              <Route exact path="/" component={home} />
              <Route path="/home" component={home} />
              <Route path="/wallet" component={wallet} />
              <Route path="/coupons" component={coupons} />
              <Route path="/leasing" component={leasing} />
              <Route path="/settings" component={settings} />
              <Route path="/user" component={user} />
              <Route path="/security" component={security} />
              <Route path="/wallet-settings" component={walletSettings} />
              <Route path="/definitions" component={definitions} />
              <Route path="/consent" component={consent} />
              <Route path="/payment" component={payment} />
              <Route path="/assets" component={assets} />
              <Route path="/ted" component={ted} />

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

App.propTypes = {
  error: PropTypes.object
};

const mapSateToProps = store => ({
  error: store.error.message
});

export default connect(mapSateToProps)(App);
