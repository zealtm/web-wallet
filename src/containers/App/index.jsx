import React, { Component } from "react";
import Login from "./login";
import App from "./app";


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
