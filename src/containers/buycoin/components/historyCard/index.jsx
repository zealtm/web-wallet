import React from "react";
import PropTypes from "prop-types";

// COMPONENTS 
import { Grid } from "@material-ui/core";

// STYLE 
import style from "./style.css";

class HistoryCard extends React.Component {
  render() {
    return (
      <div>
        <Grid container className={style.maginText}>

          <Grid item xs={8}>

            <Grid direction="row" className={style.maginText}>
              <span className={style.bold}>22/12/2018 17:30</span>
              <span className={style.status}>Confirmado</span>
            </Grid>

            <Grid direction="row" className={style.maginText}>
              <span className={style.text}>Crédito</span>
            </Grid>

            <Grid direction="row" className={style.maginText}>
              <span className={style.text}>ID - 12345678</span>
            </Grid>

          </Grid>

          <Grid item xs={4}>

            <Grid direction="row" className={style.maginTextRight}>
              <img src="" /><span className={style.img}>Lunes</span>
            </Grid>

            <Grid direction="row" className={style.maginTextRight}>
              <span className={style.lunes}>0.12345678 LUNES</span>
            </Grid>

            <Grid direction="row" className={style.maginTextRight}>
              <span className={style.text}>R$ 0,00</span>
            </Grid>
          </Grid>
        </Grid>
        <div className={style.line} />
      </div>
    )
  }
}

HistoryCard.propTypes = {

};

export default HistoryCard;