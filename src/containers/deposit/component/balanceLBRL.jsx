import React from "react";
import PropTypes from "prop-types";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// UTILS
import i18n from "../../../utils/i18n";
import { convertBiggestCoinUnit } from "../../../utils/numbers";
import { getDefaultCrypto } from "../../../utils/localStorage";
// STYLES
import style from "./style.css";

class BalanceLBRL extends React.Component {
  render() {
    const {
      credit,
      coins
    } = this.props;
    let coinSelected = getDefaultCrypto();
    let coinBalance =
      coins[coinSelected] && coins[coinSelected].balance
        ? coins[coinSelected].balance.available
        : 0;
    let coinFiat = coins[coinSelected]
      ? (coins[coinSelected].price["BRL"].price * coinBalance).toFixed(2)
      : 0;
    const total = (Number(coinFiat)) + convertBiggestCoinUnit(credit.available, 8);

    return (
        <div className={style.contentBalance}>
            <hr className={style.linBalance} /> 
            <div className={style.textBalanceBox}>
              <span className={style.textBalance}>{i18n.t("DEPOSIT_CREDIT")}</span>
              <span className={style.textBalanceGreen}>{"R$"}{total.toFixed(2)}</span>
            </div>            
        </div>
    );
  }
}
BalanceLBRL.propTypes = {
    coins: PropTypes.array,
    credit: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  };
  
  const mapStateToProps = store => ({
    coins: store.skeleton.coins,
    credit: store.skeleton.creditBalance,
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
  )(BalanceLBRL);