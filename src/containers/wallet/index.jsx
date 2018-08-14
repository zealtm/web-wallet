import React from "react";

// STYLE
import style from "./style.css";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";

class Wallet extends React.Component {
  render() {
    return (
      <div className={style.containerWallet}>
        <Grid xs={8} lg={8} xl={12} className={style.contInfoCoins}>
          <div className={style.coinSelected}>
            coin
            </div>

            <div className={style.coinBalance}>
            balance dddddddddddddddddd
            <br/>
            dddddd
            </div>
        </Grid>
      </div>
    );
  }
}

export default Wallet;
