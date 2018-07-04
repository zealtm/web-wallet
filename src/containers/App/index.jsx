import React, { Component } from "react";
import Login from "./Login";
import App from "./App";

// Access Token verification
const fakeInfo = true;
let CheckAccess = () => {
  if (fakeInfo === false) {
    return <App />;
  } else {
    return <Login />;
  }
}

class Routes extends Component {
  render() {
    return (
      <CheckAccess />
    );
  }
}

export default Routes;
