import React, { Component } from "react";
import { Provider } from "react-redux";
import Store from "./store";

//UTILS
import { getUserData } from "../../utils/localStorage";

// COMPONENTS
import Login from "./login";
import App from "./app";
import App from "./app";


// STYLE
import style from "./style.css";

// Access Token verification

let Content = () => {
  let userData = getUserData();
  let { email, secretWord, secretKey } = userData;

  if (userData, email, secretWord, secretKey) {
    
  }

  return <App />
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
