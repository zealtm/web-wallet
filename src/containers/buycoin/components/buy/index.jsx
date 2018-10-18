import React from "react";

// COMPONENTS
import PaymentBar from "../paymentBar";
import CoinsBar from "../coinsBar";
import PackCoins from "../packCoins";
import Instructions from "../instructions";

// STYLES
import style from "./style.css";

class Buy extends React.Component {
  render() {
    return (
      <div>
        <div>Créditos $ 300,00</div>
        <div>
          <CoinsBar />
        </div>
        <div>
          <PackCoins />
        </div>
        <PaymentBar />

        <div>
          <button className={style.buttonBorderGreen}>COMPRAR</button>
        </div>

        <div style={{ marginTop: "10px" }}>
          <Instructions />
        </div>
      </div>
    );
  }
}

export default Buy;
