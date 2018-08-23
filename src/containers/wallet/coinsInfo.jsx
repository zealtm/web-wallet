import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setWalletSendModalOpen,
  setWalletModalStep
} from "./redux/walletAction";

// STYLE
import style from "./style.css";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";

//COMPONENTS
import Modal from "../../components/modal";
import SendModal from "./modal/sendModal/";
import ReceiveModal from "./modal/receiveModal/";


// UTILS
import i18n from "../../utils/i18n";
import { getDefaultFiat } from "../../utils/localStorage";

class CoinsInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      modalSend: false,
      modalReceive: true
    };
  }

  previousStep = () => {
    let { step } = this.state;
    let { setWalletModalStep } = this.props;

    if (step >= 0) {
      setWalletModalStep(step - 1);
    }

    return;
  };

  renderArrowPercent = val => {
    if (parseFloat(val) < 0) {
      return <ArrowDropDown className={style.arrowPercentDown} />;
    } else {
      return <ArrowDropUp className={style.arrowPercentUp} />;
    }
  };

  render() {
    let defaultCoin = getDefaultFiat();
    let { modalSend, modalReceive } = this.state;
    let { setWalletSendModalOpen, coins, wallet } = this.props;
    let step = wallet.modal.step;
    let coin = coins[wallet.selectedCoin];
    let coinPrice = coins[wallet.selectedCoin].price[defaultCoin].price;
    let coinPercent = coins[wallet.selectedCoin].price.percent;
    let fiatBalance = coin.balance[defaultCoin].toFixed(2);
    let balance = coin.balance.available;
    return (
      <div className={style.containerWallet}>
        <Modal title={"Transação"} content={<SendModal />} show={modalSend} />
        <Modal title={"Receber"} content={<ReceiveModal coin={coin} />} show={modalReceive} />
        <Modal
          title={i18n.t("WALLET_MODAL_SEND_TITLE")}
          content={<SendModal />}
          close={
            step === 4 || step === 5 ? null : () => setWalletSendModalOpen()
          }
          back={step === 4 || step === 5 ? null : () => this.previousStep()}
          show={wallet.modal.open}
        />
        <div className={style.mainWalletInfoCoins}>
          <Grid item xs={12} sm={7} className={style.wrapperInfoCoins}>
            <div className={style.contentCoinSelected}>
              <div className={style.alignContentCoin}>
                <div className={style.nameCoinSelected}>
                  {coin.name.toUpperCase()}
                </div>
                <img
                  src={"/images/icons/coins/" + coin.abbreviation + ".png"}
                  className={style.iconCoinSelected}
                />
                <div className={style.percentageCoinSelected}>
                  {this.renderArrowPercent(coinPercent)}
                  {coinPercent}
                </div>

                <div className={style.valueCoinSelected}>{"$" + coinPrice}</div>
              </div>
            </div>

            <div className={style.floatRightDesktop}>
              <div className={style.coinBalance}>
                <div className={style.balanceMyAmount}>
                  {i18n.t("WALLET_BALANCE")}
                </div>
                <div className={style.balanceAmount}> {balance} </div>

                <div>
                  {"$" + fiatBalance}
                  <div className={style.coinBalanceGreen}> {defaultCoin} </div>
                </div>
              </div>

              <Hidden xsDown>
                <div className={style.alignButtons}>
                  <button
                    className={style.submitButton}
                    onClick={() => setWalletSendModalOpen()}
                  >
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
          <div
            className={style.alignButtonsMobile}
            onClick={() => setWalletSendModalOpen()}
          >
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
  coins: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  setWalletModalStep: PropTypes.func.isRequired,
  setWalletSendModalOpen: PropTypes.func.isRequired
};

const mapSateToProps = store => ({
  wallet: store.wallet,
  coins: store.skeleton.coins
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setWalletModalStep,
      setWalletSendModalOpen
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(CoinsInfo);
