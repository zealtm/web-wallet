import React, { Component } from "react";
import { Provider } from "react-redux";
import Store from "./store";

// COMPONENTS
import Login from "./login";
import App from "./app";
import LoadingPage from "../skeleton/loading"

// STYLE
import style from "./style.css";

// Access Token verification
const fakeInfo = 3;

let Content = () => {
  if (fakeInfo === 1) {
    return <App />;
  } else if (fakeInfo === 2) {
    return <Login />;
  } else if (fakeInfo === 3){
    return <LoadingPage />
  }
}

class Routes extends Component {
  render() {
    return (
      <div className={style.textDefault}>
        <Provider store={Store}>
          <Content />
        </Provider>
      </div>
    );
  }
}

export default Routes;
