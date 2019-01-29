import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// STYLE
import style from "./style.css";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import Hidden from "@material-ui/core/Hidden";

// UTILS
import i18n from "../../utils/i18n";
import { convertBiggestCoinUnit } from "../../utils/numbers";

//COMPONENTS
import Modal from "../../components/modal";
import ReceiveModal from "./modal/receiveModal/";

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
        <button
          className={style.receiveButton}
          onClick={() => {
            this.handleReceiveModal();
          }}
        >
          {i18n.t("BTN_RECEIVE")}
        </button>

        <button className={style.sentButton}>{i18n.t("BTN_SEND")}</button>
      </Grid>
    );
  };
  renderButtonMobile = () => {
    return (
      <Grid item xs={11} className={style.alignButtons}>
        <button
          className={style.receiveButtonMobile}
          onClick={() => {
            this.handleReceiveModal();
          }}
        >
          {i18n.t("BTN_RECEIVE")}
        </button>
        <button className={style.sentButtonMobile}>{i18n.t("BTN_SEND")}</button>
      </Grid>
    );
  };

  renderReceiveModal = coin => {
    return (
      <Modal
        title={i18n.t("WALLET_MODAL_RECEIVE_TITLE")}
        content={<ReceiveModal coin={coin} />}
        show={this.state.modalReceive}
        close={() => {
          this.handleReceiveModal();
        }}
      />
    );
  };
  handleReceiveModal = () => {
    this.setState({ modalReceive: !this.state.modalReceive });
  };
  render() {
    let { assets: assetsRoute, skeleton } = this.props;
    let { assets, selectedCoin } = assetsRoute;
    let asset = assets[selectedCoin];
    let coin = skeleton.coins.lunes;
    
    if (selectedCoin === undefined) return null;

    return (
      <div>
        {this.renderReceiveModal(coin)}
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
          <Hidden smUp>{this.renderButtonMobile()}</Hidden>
        </Grid>
      </div>
    );
  }
}

CoinsInfo.propTypes = {
  user: PropTypes.object.isRequired,
  assets: PropTypes.object.isRequired,
  skeleton: PropTypes.object.isRequired
};

const mapSateToProps = store => ({
  user: store.user.user,
  assets: store.assets,
  skeleton: store.skeleton
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(CoinsInfo);
