import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setAssetsSendModalOpen,
  setAssetsReceiveModalOpen,
  setAddressModalStep,
  resetModalSend
} from "./redux/assetsAction";

import { loadWalletInfo } from "../skeleton/redux/skeletonAction";

// STYLE
import style from "./style.css";

// COMPONENTS
import SendModal from "./modal/sendModal";
import Modal from "../../components/modal";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import Hidden from "@material-ui/core/Hidden";

// UTILS
import i18n from "../../utils/i18n";

class CoinsInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      modalSend: false,
      modalReceive: false
    };
  }

  renderArrowPercent = val => {
    if (parseFloat(val) < 0) {
      return <ArrowDropDown className={style.arrowPercentDown} />;
    } else {
      return <ArrowDropUp className={style.arrowPercentUp} />;
    }
  };

  previousStep = () => {
    let { step } = this.props.assets.modal;
    let { setAddressModalStep } = this.props;
    if (step >= 0) {
      setAddressModalStep(step - 1);
    }

    return;
  };

  handleModalSendClose = () => {
    this.props.resetModalSend();
    let { user, assets, setAssetsSendModalOpen, loadWalletInfo } = this.props;
    let step = assets.modal.step;

    if (step === 4) {
      return null;
    } else if (step === 5 || step === 6) {
      return () => {
        setAssetsSendModalOpen(), loadWalletInfo(user.password);
      };
    } else {
      return () => setAssetsReceiveModalOpen();
    }
  };

  renderBalance = () => {
    let { coins } = this.props;
    let asset = coins["lunes"];
    return (
      <Grid item xs={8} className={style.floatRight}>
        <Grid item className={style.balanceItem}>
          <h2>{i18n.t("WALLET_BALANCE")}</h2>
          <p>{asset.balance.available}</p>
        </Grid>
        <Hidden xsDown> {this.renderButton()}</Hidden>
      </Grid>
    );
  };

  renderBalanceMobile = () => {
    let { coins } = this.props;
    let asset = coins["lunes"];
    return (
      <Grid item xs={8} className={style.floatRight}>
        <Grid item className={style.balanceItemMobile}>
          <h2>{i18n.t("WALLET_BALANCE")}</h2>
          <p>{asset.balance.available}</p>
        </Grid>
        <Hidden xsDown> {this.renderButton()}</Hidden>
      </Grid>
    );
  };
  renderButton = () => {
    let { setAssetsSendModalOpen } = this.props;
    return (
      <Grid item className={style.alignButtons}>
        <button className={style.receiveButton}>{i18n.t("BTN_RECEIVE")}</button>

        <button
          className={style.sentButton}
          onClick={() => setAssetsSendModalOpen()}
        >
          {i18n.t("BTN_SEND")}
        </button>
      </Grid>
    );
  };
  renderButtonMobile = () => {
    return (
      <Grid item xs={11} className={style.alignButtons}>
        <button className={style.receiveButtonMobile}>
          {i18n.t("BTN_RECEIVE")}
        </button>
        <button className={style.sentButtonMobile}>{i18n.t("BTN_SEND")}</button>
      </Grid>
    );
  };

  render() {
    let { assets } = this.props;
    let step = assets.modal.step;

    return (
      <div>
        <Modal
          title={i18n.t("WALLET_MODAL_SEND_TITLE")}
          content={<SendModal />}
          show={assets.modal.open}
          close={this.handleModalSendClose}
          back={
            step === 0 || step === 4 || step === 5 || step === 6
              ? null
              : () => this.previousStep()
          }
        />

        <Grid container className={style.containerInfo}>
          <Grid item xs={11} sm={7} md={6} className={style.contentInfo}>
            <Grid item xs={4} className={style.coinSel}>
              <Grid item>
                {/* <h3>{asset.tokenName.toUpperCase()}</h3> */}
                <img
                  src={"images/icons/tokens/default.png"}
                  className={style.iconCoinSelected}
                />
              </Grid>
            </Grid>
            <Hidden xsDown>{this.renderBalance()}</Hidden>

            <Hidden smUp>{this.renderBalanceMobile()}</Hidden>
          </Grid>
        </Grid>
        <Hidden smUp>{this.renderButtonMobile()}</Hidden>
      </div>
    );
  }
}

CoinsInfo.propTypes = {
  user: PropTypes.object.isRequired,
  coins: PropTypes.array.isRequired,
  assets: PropTypes.object.isRequired,
  loadWalletInfo: PropTypes.func.isRequired,
  setAssetsSendModalOpen: PropTypes.func.isRequired,
  setAssetsReceiveModalOpen: PropTypes.func.isRequired,
  resetModalSend: PropTypes.func.isRequired,
  setAddressModalStep: PropTypes.func.isRequired
};

const mapSateToProps = store => ({
  user: store.user.user,
  assets: store.assets,
  modal: store.assets.modal,
  coins: store.skeleton.coins
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setAssetsSendModalOpen,
      setAssetsReceiveModalOpen,
      resetModalSend,
      setAddressModalStep,
      loadWalletInfo
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(CoinsInfo);
