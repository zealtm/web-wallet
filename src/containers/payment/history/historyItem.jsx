import React from "react";
import PropTypes from "prop-types";

import style from "./style.css";
import { Grid } from "@material-ui/core";

class HistoryItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={12} className={style.row}>
          <div className={style.itemLeft}>
            <p className={style.description}>Energia</p>
            <p className={style.defaultText}>04/09/2018 17:00</p>
            <p className={style.statusConfirmed}>confirmado</p>
          </div>
          <div className={style.itemRight}>
            <p className={style.icon}><img src="/images/icons/coins/lunes.png" alt="Lunes"/> Lunes</p>
            <p className={style.coinValue}>17642</p>
            <p>R$ 190,92</p>
          </div>
        </Grid>
        <div className={style.line}></div>
      </Grid>
    );
  }
}

HistoryItem.propTypes = {

}

export default HistoryItem;
