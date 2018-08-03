import React, { Component } from "react";
import { Provider } from "react-redux";
import Store from "./store";

//UTILS
import { getUserData, clearAll } from "../../utils/localStorage";

// COMPONENTS
import Login from "./login";
import App from "./app";
import LoadingPage from "../skeleton/loading";

// STYLE
import style from "./style.css";

// Access Token verification

class Routes extends Component {
  constructor() {
    super();
    this.state = {
      content: undefined
    };
  }

  changeContent = content => {
    this.setState({ content });
  };

  componentDidMount() {
    this.renderContent();
  }

  renderContent = () => {
    try {
      let userData = getUserData();
      if (userData) {
        let { email, secretWord } = userData;

        if ((email, secretWord)) {
          return this.changeContent(<App />);
        }
      }

      return this.changeContent(<Login />);
    } catch (error) {
      console.warn(error);
      clearAll();
      return this.changeContent(<Login />);
    }
  };

  render() {
    let { content } = this.state;

    return (
      <div className={style.textDefault}>
        <Provider store={Store}>{content ? content : <LoadingPage />}</Provider>
      </div>
    );
  }
}

export default Routes;
