import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setAddressModalStep,
  setAssetTransaction
} from "../../redux/assetsAction";

// COMPONENTS
import Loading from "../../../../components/loading";

// STYLE
import style from "../../style.css";

// UTILS
import i18n from "../../../../utils/i18n";

class BoxProcess extends React.Component {
  doTransaction = () => {
    const { setAddressModalStep } = this.props;
    let { assets, user, modal, coins, setAssetTransaction } = this.props;
    let { selectedCoin } = assets;
    let assetId = assets.assets[selectedCoin].assetId;
    if (assetId) {
      setAssetTransaction(
        {
          coin: "lunes",
          fromAddress: coins["lunes"].address,
          lunesUserAddress: coins["lunes"].address,
          toAddress: modal.address,
          amount: modal.sendAmount,
          fee: modal.feeValue.selectedFee,
          feePerByte: modal.feeValue.selectedFeePerByte,
          feeLunes: modal.feeValue.selectedFeeLunes,
          price: coins["lunes"].price,
          decimalPoint: coins["lunes"].decimalPoint,
          assetId: assetId
        },
        user.password
      );
    }

    //setAddressModalStep(5);
    return;
  };

  componentDidMount() {
    this.doTransaction();
    return;
  }

  render() {
    let { coin, modal, assets } = this.props;
    let { selectedCoin } = assets;
    let amount = modal.sendAmount.toFixed(8);
    return (
      <div className={style.modalBox}>
        <img
          src={"images/icons/tokens/default.png"}
          className={style.modalIconCoin}
        />
        <div className={style.processInfo}>
          <span>{i18n.t("MODAL_SEND_TO_SEND")} </span>
          <span className={style.totalConfirm}>
            {amount + " " + assets.assets[selectedCoin].tokenName.toUpperCase()}
          </span>
          <span> {i18n.t("MODAL_SEND_TO_ADDRESS")} </span>
          <span className={style.addressConfirm}>{modal.address}</span>
        </div>
        <Loading width={"30px"} />
        <div className={style.confirmFee}>
          <div className={style.textHelp}>
            {i18n.t("MODAL_SEND_INFO_BLOCKCHAIN")} {coin.toUpperCase()}
          </div>
        </div>
      </div>
    );
  }
}

BoxProcess.propTypes = {
  assets: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  coin: PropTypes.string.isRequired,
  coins: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  modal: PropTypes.object.isRequired,
  setAddressModalStep: PropTypes.func.isRequired,
  setAssetTransaction: PropTypes.func.isRequired
};

const mapSateToProps = store => ({
  assets: store.assets,
  user: store.user.user,
  modal: store.assets.modal,
  coins: store.skeleton.coins
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setAddressModalStep,
      setAssetTransaction
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(BoxProcess);
