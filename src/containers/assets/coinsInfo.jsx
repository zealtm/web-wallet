import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalAssets } from "./redux/assetsAction";

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
import { convertBiggestCoinUnit } from "../../utils/numbers";

class CoinsInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      modalSend: false,
      modalReceive: false,
      isOpen: true
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
    let { modal, setModalAssets } = this.props;
    if (modal >= 0) {
      setModalAssets(modal - 1);
    }

    return;
  };

  handleModalSendClose = () => {
    let { setModalAssets } = this.props;
    setModalAssets(0);
    this.setState({ isOpen: false });
  };

  renderBalance = () => {
    let { assets: assetsRoute } = this.props;
    let { assets, selectedCoin } = assetsRoute;
    let asset = assets[selectedCoin];
    return (
      <Grid item xs={8} className={style.floatRight}>
        <Grid item className={style.balanceItem}>
          <h2>{i18n.t("WALLET_BALANCE")}</h2>
          <p>{convertBiggestCoinUnit(asset.balance, 8)}</p>
        </Grid>
        <Hidden xsDown> {this.renderButton()}</Hidden>
      </Grid>
    );
  };
  
  renderBalanceMobile = () => {
    let { assets: assetsRoute } = this.props;
    let { assets, selectedCoin } = assetsRoute;
    let asset = assets[selectedCoin];
    return (
      <Grid item xs={8} className={style.floatRight}>
        <Grid item className={style.balanceItemMobile}>
          <h2>{i18n.t("WALLET_BALANCE")}</h2>
          <p>{convertBiggestCoinUnit(asset.balance, 8)}</p>
        </Grid>
        <Hidden xsDown> {this.renderButton()}</Hidden>
      </Grid>
    );
  };
  renderButton = () => {
    return (
      <Grid item className={style.alignButtons}>
        <button className={style.receiveButton}>{i18n.t("BTN_RECEIVE")}</button>

        <button className={style.sentButton}>{i18n.t("BTN_SEND")}</button>
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
    let { assets: assetsRoute } = this.props;
    const { isOpen } = this.state;
    let { assets, selectedCoin } = assetsRoute;
    let asset = assets[selectedCoin];

    // if (selectedCoin === undefined) return null;

    return (
      <div>
        <Modal
          title={i18n.t("WALLET_MODAL_SEND_TITLE")}
          content={<SendModal />}
          show={isOpen}
          close={this.handleModalSendClose}
          back={() => this.previousStep()}
        />

        <Grid container className={style.containerInfo}>
          <Grid item xs={11} sm={7} md={6} className={style.contentInfo}>
            <Grid item xs={4} className={style.coinSel}>
              <Grid item>
                <h3>{asset.tokenName.toUpperCase()}</h3>
                <img
                  src={
                    asset.image
                      ? asset.image
                      : "images/icons/tokens/default.png"
                  }
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
  assets: PropTypes.object.isRequired,
  setModalAssets: PropTypes.func.isRequired,
  modal: PropTypes.number.isRequired
};

const mapSateToProps = store => ({
  user: store.user.user,
  assets: store.assets,
  modal: store.assets.modal
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setModalAssets
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(CoinsInfo);
