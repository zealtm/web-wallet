import React from "react";
import PropTypes from "prop-types";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";

// STYLES
import style from "./style.css";

class CardPack extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid container>
        <Grid item>
          <div className={style.cardBuy}>
            <img
              src="/images/icons/coins/lunes.png"
              className={style.cardIcon}
            />
            <div className={style.hrCard} />
            <p>Você está comprando <b>15,00 Reais</b> e está recebendo</p>
            <h1 className={style.amount}>500000</h1>
            <div className={style.valueCard}>
              <span className={style.dollarSign}>R$</span>
              <span className={style.value}>15</span>
              <span className={style.decimals}>,00</span>
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

CardPack.propTypes = {};

export default CardPack;
