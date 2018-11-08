import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setAssetModalStep,
  setAssetSendModalOpen
} from "./redux/assetsAction";

// STYLE
import style from "./style.css";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";

// UTILS
import i18n from "../../utils/i18n";
import { convertBiggestCoinUnit } from "../../utils/numbers";

//COMPONENTS
import Modal from "../../components/modal";
import SendModal from "./modal/sendModal/";

class CoinsInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      modalSend: false,
      modalReceive: false
    };
  }
  previousStep = () => {
    let { step } = this.props.asset.modal;
    let { setAssetModalStep } = this.props;
    if (step >= 0) {
      setAssetModalStep(step - 1);
    }
    return;
  };
  handleModalSendClose = () => {
    let { setAssetSendModalOpen } = this.props;
    return () => setAssetSendModalOpen();
    
  };
  handleSendModalOpen = () => {
    let { setAssetSendModalOpen } = this.props;
    setAssetSendModalOpen();
  }
  renderArrowPercent = val => {
    if (parseFloat(val) < 0) {
      return <ArrowDropDown className={style.arrowPercentDown} />;
    } else {
      return <ArrowDropUp className={style.arrowPercentUp} />;
    }
  };

  render() {
    const {modalSend} =this.state;
    let { asset: assetsRoute } = this.props;
    let { assets, selectedCoin } = assetsRoute;
    let token = assets[selectedCoin];
    let step = assetsRoute.modal.slep;
    if (selectedCoin === undefined) return null;

    return (
      <div>
        <Modal
          title={i18n.t("WALLET_MODAL_SEND_TITLE")}
          content={<SendModal />}
          show={this.props.asset.modal.open}
          close={this.handleModalSendClose}
          back={
            step === 0 || step === 4 || step === 5
              ? null
              : () => this.previousStep()
          }
        />
        <Grid container className={style.containerInfo}>
          <Grid item xs={12} sm={7} md={6} className={style.contentInfo}>
            <Grid item xs={4} className={style.coinSel}>
              <Grid item>
                <h3>{token.tokenName.toUpperCase()}</h3>
                <img
                  src={
                    token.image
                      ? token.image
                      : "images/icons/tokens/default.png"
                  }
                  className={style.iconCoinSelected}
                />
              </Grid>
            </Grid>

            <Grid
              item
              xs={8}
              className={style.balanceItem + " " + style.floatRight}
            >
              <Grid item>
                <h2>{i18n.t("WALLET_BALANCE")}</h2>
                <p>{convertBiggestCoinUnit(token.balance, 8)}</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12} item>
            <div className={style.centerSend}>
              <button
                className={style.sentButton}
                onClick={() => {
                  this.handleSendModalOpen();
                }}
              >
                {i18n.t("BTN_SEND")}
              </button>
            </div>
          </Grid>
        </Grid>

      </div>
    );
  }
}

CoinsInfo.propTypes = {
  user: PropTypes.object.isRequired,
  asset: PropTypes.object.isRequired,
  setAssetModalStep: PropTypes.func.isRequired,
  setAssetSendModalOpen: PropTypes.func.isRequired
};

const mapSateToProps = store => ({
  user: store.user.user,
  asset: store.asset,
  
});

const mapDispatchToProps = dispatch => bindActionCreators({ setAssetModalStep, setAssetSendModalOpen }, dispatch);

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(CoinsInfo);
