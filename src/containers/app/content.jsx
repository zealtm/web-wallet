import React, { Component } from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";

//UTILS
import { getUsername, clearAll } from "../../utils/localStorage";

// COMPONENTS
import Login from "./login";
import App from "./app";
import LoadingPage from "../skeleton/loading";

class Content extends Component {
  constructor() {
    super();
    this.state = {
      content: undefined,
      type: undefined
    };
  }

  changeContent = (content, type) => {
    this.setState({ content, type });
  };

  componentDidMount() {
    this.renderContent();
  }

  componentDidUpdate() {
    let { type } = this.state;
    let { loading } = this.props.skeleton;
    console.warn(loading)
    if (loading) {
      if (type !== "loading") return this.renderLoading();
      return;
    }
    this.renderContent();
  }

  renderLoading = () => {
    return this.changeContent(<LoadingPage />, "loading");
  };

  renderContent = () => {
    try {
      let { type } = this.state;
      let usernameStorage = getUsername();
      let { username, seed, password } = this.props.user.user;

      if (seed && password && type !== "app" && usernameStorage === username) {
        return this.changeContent(<App />, "app");
      }

      if ((!seed || !password) && type !== "login") {
        return this.changeContent(<Login />, "login");
      }
    } catch (error) {
      console.warn(error);
      clearAll();
      return this.changeContent(<Login />, "login");
    }
  };

  render() {
    let { content } = this.state;

    return <div>{content ? content : <LoadingPage />}</div>;
  }
}

connect.propTypes = {
  user: PropTypes.object,
  skeleton: PropTypes.object,
  username: PropTypes.string,
  seed: PropTypes.string,
  password: PropTypes.string
};

const mapSateToProps = store => ({
  user: store.user,
  skeleton: store.skeleton
});

export default connect(
  mapSateToProps,
  null
)(Content);
