import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setAssetSendModalOpen,
  setAssetReceiveModalOpen,
  setAssetModalStep,
  setAssetLoading
} from "./redux/assetsAction";

import { loadWalletInfo } from "../skeleton/redux/skeletonAction";

// STYLE
import style from "./style.css";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
// import Hidden from "@material-ui/core/Hidden";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";

//COMPONENTS
import Modal from "../../components/modal";
import SendModal from "./modal/sendModal/";
import ReceiveModal from "./modal/receiveModal/";

// UTILS
import i18n from "../../utils/i18n";
// import { getDefaultFiat } from "../../utils/localStorage";

class CoinsInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      modalSend: false,
      modalReceive: false
    };
  }

  previousStep = () => {
    let { step } = this.props.assets.modal;
    let { setAssetModalStep } = this.props;
    if (step >= 0) {
      setAssetModalStep(step - 1);
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
    // let defaultCoin = getDefaultFiat();
    let {
      setAssetSendModalOpen,
      setAssetReceiveModalOpen,
      setAssetLoading,
      loadWalletInfo,
      assets: assetsRoute,
      user
    } = this.props;
    let { assets, selectedCoin } = assetsRoute;
    let step = assetsRoute.modal.step;
    let coin = assets.find(asset => asset.assetId === selectedCoin ? true : false);

    if (!coin) return null;

    return (
      <div>
        <Modal
          title={i18n.t("WALLET_MODAL_RECEIVE_TITLE")}
          content={<ReceiveModal coin={coin} />}
          show={assetsRoute.modalReceive.open}
          close={() => setAssetReceiveModalOpen()}
        />

        <Modal
          title={i18n.t("WALLET_MODAL_SEND_TITLE")}
          content={<SendModal />}
          show={assetsRoute.modal.open}
          close={
            step === 4
              ? null
              : step === 5 || step === 6
                ? () => {
                  setAssetSendModalOpen(),
                  setAssetLoading(true),
                  loadWalletInfo(user.password);
                }
                : () => setAssetSendModalOpen()
          }
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
                <h3>{coin.tokenName.toUpperCase()}</h3>
                <img
                  src={"./images/icons/coins/" + coin.abbreviation + ".png"}
                  className={style.iconCoinSelected}
                />
              </Grid>
            </Grid>

            <Grid item xs={8} className={style.balanceItem+' '+style.floatRight}>
              <Grid item>
                <h2>{i18n.t("WALLET_BALANCE")}</h2>
                <p>{coin.balance}</p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

CoinsInfo.propTypes = {
  user: PropTypes.object.isRequired,
  assets: PropTypes.object.isRequired,
  coins: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  loadWalletInfo: PropTypes.func.isRequired,
  setAssetLoading: PropTypes.func.isRequired,
  setAssetModalStep: PropTypes.func.isRequired,
  setAssetSendModalOpen: PropTypes.func.isRequired,
  setAssetReceiveModalOpen: PropTypes.func
};

const mapSateToProps = store => ({
  user: store.user.user,
  assets: store.assets,
  coins: store.skeleton.coins
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadWalletInfo,
      setAssetLoading,
      setAssetModalStep,
      setAssetSendModalOpen,
      setAssetReceiveModalOpen
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(CoinsInfo);
