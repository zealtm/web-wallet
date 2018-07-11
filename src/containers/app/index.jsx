import React, { Component } from "react";
import { Provider } from "react-redux";
import Store from "./store";

// COMPONENTS
import Login from "./login";
import App from "./app";

// STYLE
import style from "./style.css";

// Access Token verification
const fakeInfo = true;
let Content = () => {
  if (fakeInfo === false) {
    return <App />;
  } else {
    return <Login />;
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
