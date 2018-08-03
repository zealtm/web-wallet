import React, { Component } from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";

//UTILS
import { getUserData, clearAll } from "../../utils/localStorage";

// COMPONENTS
import Login from "./login";
import App from "./app";
import LoadingPage from "../skeleton/loading";

// Access Token verification

class Content extends Component {
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
      let { seed, password } = this.props.user.user

      if  (seed && password) {
        return this.changeContent(<App />);
      }

      if (userData) {
        let { email, secretWord } = userData;

        if ((email && secretWord)) {
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

    return <div>{content ? content : <LoadingPage />}</div>;
  }
}

connect.propTypes = {
  user: PropTypes.object
};

const mapSateToProps = store => ({
  user: store.user
});

export default connect(
  mapSateToProps,
  null
)(Content);
