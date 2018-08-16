import React from "react";

// COMPONENTS
import CoinsBar from "./coinsBar";
import CoinsInfo from "./coinsInfo";

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <CoinsBar />
        <CoinsInfo />
      </div>
    );
  }
}

export default Wallet;
