import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setModalAssets,
  setAssetsSendModalAmount,
  getAssetsSendModalFee,
  setAssetsSendModalLoading
} from "../../redux/assetsAction";
import { errorInput } from "../../../errors/redux/errorAction";

// COMPONENTS
import ButtonContinue from "./buttonContinue.jsx";

// UTILS
import i18n from "../../../../utils/i18n";
import { convertBiggestCoinUnit } from "../../../../utils/numbers";

// STYLE
import style from "../../style.css";

class BoxAmount extends React.Component {
  constructor() {
    super();
    this.state = {
      amount: ""
    };
  }

  setAmount = amount => {
    let regex = new RegExp("^[0-9,.]+$");
    amount = amount.replace(",", ".");
    if (!amount || regex.test(amount.toString())) {
      this.setState({ ...this.state, amount });
    }
  };

  calcPercent = value => {
    let { assets } = this.props;
    let { selectedCoin } = assets;
    let assetBalance = assets.assets[selectedCoin].balance;
    let decimalPoint = assets.assets[selectedCoin].decimals;
    let calcPercent = convertBiggestCoinUnit(
      (assetBalance / 100) * value,
      decimalPoint
    ).toFixed(decimalPoint);
    this.setAmount(calcPercent.toString());
  };

  confirmAmount = () => {
    let { amount } = this.state;
    let {
      modal,
      coins,
      coin,
      errorInput,
      setAssetsSendModalLoading,
      getAssetsSendModalFee,
      setAssetsSendModalAmount,
      assets
    } = this.props;
    let { selectedCoin } = assets;
    let assetBalance = assets.assets[selectedCoin].balance;


    if (parseFloat(amount) <= assetBalance) {
      setAssetsSendModalLoading();
      setAssetsSendModalAmount(parseFloat(amount));
      getAssetsSendModalFee(
        coin,
        coins[coin].address,
        modal.address,
        parseFloat(amount),
        coins[coin].decimalPoint
      );
      return;
    }

    return errorInput(i18n.t("MESSAGE_INVALID_AMOUNT"));
  };

  render() {
    let { amount } = this.state;
    let { modal, coin, assets } = this.props;
    let { selectedCoin } = assets;
    return (
      <div className={style.modalBox}>
        <img
          src={"images/icons/tokens/default.png"}
          className={style.modalIconCoin}
        />
        <div>{i18n.t("MODAL_SEND_AMOUNT")}</div>
        <input
          className={style.txtamount}
          type="text"
          name="txtamount"
          placeholder="0"
          value={amount}
          onChange={event => this.setAmount(event.target.value)}
        />

        <div className={style.boxPercent}>
          <span onClick={() => this.calcPercent(25)}>25%</span>
          <span onClick={() => this.calcPercent(50)}>50%</span>
          <span onClick={() => this.calcPercent(75)}>75%</span>
          <span onClick={() => this.calcPercent(100)}>Max</span>
        </div>

        <div className={style.textHelp}>
          {i18n.t("MODAL_SEND_AMOUNT_INSTRUCTIONS")}
        </div>

        <span className={style.addressConfirm}>{modal.address}</span>

        <div className={style.paddingTop8}>
          <ButtonContinue
            action={() => this.confirmAmount()}
            loading={modal.loading}
          />
        </div>
      </div>
    );
  }
}

BoxAmount.propTypes = {
  assets: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
  coin: PropTypes.string.isRequired,
  coins: PropTypes.array.isRequired,
  errorInput: PropTypes.func.isRequired,
  setModalAssets: PropTypes.func.isRequired,
  setAssetsSendModalAmount: PropTypes.func.isRequired,
  getAssetsSendModalFee: PropTypes.func.isRequired,
  setAssetsSendModalLoading: PropTypes.func.isRequired
};

const mapSateToProps = store => ({
  modal: store.assets.modal,
  coins: store.skeleton.coins,
  assets: store.assets
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setModalAssets,
      setAssetsSendModalAmount,
      getAssetsSendModalFee,
      setAssetsSendModalLoading,
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(BoxAmount);
