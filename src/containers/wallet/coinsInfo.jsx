import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";

// STYLE
import style from "./style.css";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

// UTILS
import i18n from "../../utils/i18n";
import { getDefaultFiat } from "../../utils/localStorage";

class CoinsInfo extends React.Component {
  render() {
    let defaultCoin = getDefaultFiat();
    let { coins, wallet } = this.props;
    let coin = coins[wallet.selectedCoin];
    let coinPrice = coins[wallet.selectedCoin].price[defaultCoin].price
    let fiatBalance = coin.balance[defaultCoin].toFixed(2);
    let balance = coin.balance.available;

    return (
      <div>
        <div className={style.containerWallet}>
          <Grid item xs={12} sm={8} className={style.containerInfoCoins}>
            <div className={style.coinSelected}>
              <div className={style.nameCoinSelected}>
                {coin.name.toUpperCase()}
              </div>
              <img
                src={"/images/icons/coins/" + coin.abbreviation + ".png"}
                className={style.logoCoinSelected}
              />
              <div className={style.percentageCoinSelected}> {"+7,63%"} </div>

              <div className={style.valueCoinSelected}>
                {"$" + coinPrice}
              </div>
            </div>

            <div className={style.floatRightInWeb}>
              <div className={style.coinBalance}>
                <div className={style.balanceMyAmount}>
                  {i18n.t("WALLET_MY_AMOUNT")}
                </div>
                <div className={style.balanceAmount}> {balance} </div>

                <div>
                  {"$" + fiatBalance}
                  <div className={style.coinBalanceGreen}> {defaultCoin} </div>
                </div>
              </div>

              <Hidden xsDown>
                <div className={style.alignButtons}>
                  <button className={style.receiveButton}>
                    {i18n.t("BTN_RECEIVE")}
                  </button>

                  <button className={style.submitButton}>
                    {i18n.t("BTN_SEND")}
                  </button>
                </div>
              </Hidden>
            </div>
          </Grid>
        </div>

        <Hidden smUp>
          <div className={style.alignButtonsMobile}>
            <button className={style.submitButtonMobile}>
              {i18n.t("BTN_SUBMIT")}
            </button>

            <button className={style.receiveButtonMobile}>
              {i18n.t("BTN_RECEIVE")}
            </button>
          </div>
        </Hidden>
      </div>
    );
  }
}

CoinsInfo.propTypes = {
  wallet: PropTypes.object.isRequired,
  coins: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

const mapSateToProps = store => ({
  wallet: store.wallet,
  coins: store.skeleton.coins
});

export default connect(
  mapSateToProps,
  null
)(CoinsInfo);
