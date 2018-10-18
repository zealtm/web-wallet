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
    const {buypack, onSelect, active, selectedCoin} = this.props;
    const styleactive = active ? style.cardBuyActive : style.cardBuy;
    
    // coinAmount: 120000000000
    // count: 1
    // fiatAmount: 15
    // id: 1

    return (
      <div className={styleactive} onClick={()=>onSelect(buypack.id)}>
        <img
          src={`/images/icons/coins/${selectedCoin.abbreviation}.png`}
          className={style.cardIcon}
        />
        <div className={style.hrCard} />
        <p>Você está comprando <b>{`R$${buypack.fiatAmount}`}</b> e está recebendo</p>
        <h1 className={style.amount}>{buypack.coinAmount}</h1>
        <div className={style.valueCard}>
          <span className={style.dollarSign}>R$</span>
          <span className={style.value}>{buypack.fiatAmount}</span>
          <span className={style.decimals}>,00</span>
        </div>
      </div>
    );
  }
}

CardPack.propTypes = {
  buypack: PropTypes.object.isRequired,
  selectedCoin: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  active: PropTypes.bool
};

export default CardPack;
