import React from "react";

// COMPONENTS
import CoinsBar from "./coinsBar";
import CoinsInfo from "./coinsInfo";
import TransactionHistory from "./transactionHistory";


class Wallet extends React.Component {
  render() {
    return (
      <div>      
        <CoinsBar />
        <CoinsInfo />
        <TransactionHistory />
      </div>
    );
  }
}

export default Wallet;
