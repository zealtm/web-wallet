import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";

// UTILS
import {convertBiggestCoinUnit} from "../../../../utils/numbers";
import { getDefaultFiat } from "../../../../utils/localStorage";
import i18n from "../../../../utils/i18n";

// STYLES
import style from "./style.css";

class CardPack extends React.Component {
  constructor(props) {
    super(props);
  }
  renderValCoin(){
    const { buypackage, buypack, coins } = this.props;
   
    let defaultCoin = "BRL";
    let fiatAmount = buypack.fiatAmount[defaultCoin.toUpperCase()];
    
    if(buypackage.paycoin != ''){
      let coin = coins[buypackage.paycoin];
      let price = coin.price[defaultCoin];
      let qtdCoin = (fiatAmount / price.price).toFixed(8);
      console.log(JSON.stringify(qtdCoin))
      return(
        <div className={style.valueCard}>
            <span className={style.dollarSign}>{buypackage.paycoin.toUpperCase()}</span><br/>
            <span className={style.valueCoin}>{qtdCoin}</span>
        </div>
      );
    }
    return(
      <div className={style.valueCard}>
          <span className={style.dollarSign}>R$</span>
          <span className={style.value}>{parseFloat(fiatAmount).toFixed(0)}</span>
          <span className={style.decimals}>,00</span>
      </div>
    );
  }
  render() {
    const {buypack, onSelect, active, selectedCoin} = this.props;
    const styleactive = active ? style.cardBuyActive : style.cardBuy;
    //let defaultCoin = getDefaultFiat();
    let defaultCoin = "BRL";
    let fiatAmount = buypack.fiatAmount[defaultCoin.toUpperCase()];

    return (
      <div className={styleactive} onClick={()=>onSelect(buypack.id, buypack.coinAmount, fiatAmount)}>
        <img
          src={`/images/icons/coins/${selectedCoin.abbreviation}.png`}
          className={style.cardIcon}
        />
        <div className={style.hrCard} />
        <p className={style.paragraph}> {i18n.t("COINSALE_PACK_TEXT_PREFIX")} <b>{`${defaultCoin} ${parseFloat(fiatAmount).toFixed(2)}`}</b> {i18n.t("COINSALE_PACK_TEXT_SUFIX")} </p>
        <h1 className={style.amount}>{convertBiggestCoinUnit(buypack.coinAmount,8)}</h1>
        {this.renderValCoin()}
      </div>
    );
  }
}

CardPack.propTypes = {
  buypack: PropTypes.object.isRequired,
  selectedCoin: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  active: PropTypes.bool,
  buypackage: PropTypes.object,
  coins: PropTypes.array.isRequired,
};

const mapStateToProps = store => ({
  buypackage: store.buy.buypackage || [],
  coins: store.skeleton.coins,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  );
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CardPack);
