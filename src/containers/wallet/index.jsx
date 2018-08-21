import React from "react";

// COMPONENTS
import CoinsBar from "./coinsBar";
import CoinsInfo from "./coinsInfo";
import TransactionHistory from "./transactionHistory";

//STYLE
import style from "./style.css";

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <CoinsBar />
        <div>
          <CoinsInfo />
          <TransactionHistory />
        </div>
      </div>
    );
  }
}

export default Wallet;
