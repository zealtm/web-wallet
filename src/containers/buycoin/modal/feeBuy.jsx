import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getFeeBuy,
  setFeeBuy,
  setModalStep,
  confirmBuy
} from "../redux/buyAction";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

//COMPONENTS
import ButtonContinue from "../../../components/buttonContinue";
import ModalBar from "../../../components/modalBar";
import Loading from "../../../components/loading";

//UTILS
import i18n from "../../../utils/i18n";
import { convertBiggestCoinUnit } from "../../../utils/numbers";

// STYLE
import style from "./style.css";

class FeeBuy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeSelect: 0,
      error: undefined,
      messageError: ""
    };
  }

  calcFee(set) {
    const { setFeeBuy, fee } = this.props;

    let feeValue = 0;
    let feePerByte = 0;
    let feeLunes = 0;

    switch (set) {
      case "low":
        feeValue = fee.fee.low;
        feePerByte = fee.feePerByte.low;
        feeLunes = fee.feeLunes.low;
        break;
      case "medium":
        feeValue = fee.fee.medium;
        feePerByte = fee.feePerByte.medium;
        feeLunes = fee.feeLunes.medium;
        break;
      case "high":
        feeValue = fee.fee.high;
        feePerByte = fee.feePerByte.high;
        feeLunes = fee.feeLunes.high;
        break;
    }

    this.setState({ feeSelect: feeValue });

    const payload = {
      fee: feeValue,
      feePerByte: feePerByte,
      feeLunes: feeLunes
    };

    setFeeBuy(payload);
  }

  validateForm = () => {
    const {
      setModalStep,
      errorInput,
      clearMessage,
      coins,
      buypack,
      user,
      lunes,
      confirmBuy,
      creditBalance
    } = this.props;
    let creditsAvailable = convertBiggestCoinUnit(
      creditBalance.available,
      8
    ).toFixed(2);
    const { feeSelect } = this.state;
    if (buypack.servicePaymentMethodId !== 6) {
      let coinBalance = coins[buypack.paycoin].balance.available;
      let amount = buypack.amountPay + feeSelect;

      if (feeSelect > 0) {
        if (parseFloat(amount) <= coinBalance) {
          setModalStep(2);
        } else {
          errorInput(i18n.t("PAYMENT_AMOUNT_ERROR"));
          return;
        }
      } else {
        errorInput(i18n.t("MESSAGE_SELECT_FEE"));
        return;
      }
      clearMessage();
    } else {
      const payload = {
        coin: null,
        fromAddress: null,
        toAddress: null,
        lunesUserAddress: lunes.address,
        amount: buypack.amountFiat,
        amountReceive: buypack.amount,
        fee: null,
        feePerByte: null,
        feeLunes: null,
        price: null,
        decimalPoint: null,
        user: user.password,
        buypack: buypack,
        servicePaymentMethodId: buypack.servicePaymentMethodId,
        serviceCoinId: buypack.serviceCoinId,
        receiveAddress: coins[buypack.coin.abbreviation]
          ? coins[buypack.coin.abbreviation].address
          : ""
      };
      if (Number(creditsAvailable) >= buypack.amountFiat) {
        confirmBuy(payload);
      } else {
        this.setState({
          error: true,
          messageError: i18n.t("INSUFFICIENT_CREDIT")
        });
      }
    }
  };

  componentDidMount = () => {
    const { getFeeBuy, buypack, wallet } = this.props;
    if (buypack.servicePaymentMethodId !== 6) {
      const fromAddress = wallet.coins[buypack.paycoin].address;
      const toAddress = buypack.address;
      const decimalPoint = wallet.coins[buypack.paycoin].decimalPoint;

      getFeeBuy(
        buypack.paycoin,
        buypack.amountPay,
        fromAddress,
        toAddress,
        decimalPoint
      );
    }
  };
  renderFee = () => {
    const { loading, buypack, fee } = this.props;
    const { error, messageError, feeSelect } = this.state;
    return (
      <div>
        <div>
          {error ? (
            <ModalBar type="error" message={messageError} timer />
          ) : null}
        </div>
        <img
          src={`/images/icons/coins/${buypack.paycoin}.png`}
          className={style.modalIconCoin}
        />
        <div>
          <span>{i18n.t("COINSALE_FEE_TEXT_1")}</span>
          <span className={style.totalConfirm}>
            {buypack.amountPay.toFixed(8)} {buypack.paycoin.toUpperCase()}
          </span>
        </div>
        <div>
          <span>{i18n.t("COINSALE_FEE_TEXT_2")}</span>
          <span className={style.addressConfirm}>
            {i18n.t("COINSALE_TITLE")}
          </span>
        </div>

        <div className={style.confirmFee}>
          <div>
            {i18n.t("PAYMENT_FEE_AMOUNT")}
            <span> {buypack.paycoin} </span> é
          </div>
          <div className={style.txtamount}>{feeSelect}</div>
        </div>

        <div className={style.boxFee}>
          <span
            className={style.greenLabelFee}
            onClick={() => this.calcFee("low")}
          >
            {i18n.t("FEE_LOW")} {fee.fee.low}
          </span>
          <span
            className={style.yellowLabelFee}
            onClick={() => this.calcFee("medium")}
          >
            {i18n.t("FEE_MEDIUM")} {fee.fee.medium}
          </span>
          <span
            className={style.redLabelFee}
            onClick={() => this.calcFee("high")}
          >
            {i18n.t("FEE_HIGH")} {fee.fee.high}
          </span>
        </div>
      </div>
    );
  };
  renderCreditPayment = () => {
    const { buypack } = this.props;
    return (
      <div className={style.strongText} style={{ marginTop: 20 }}>
        {i18n.t("CREDIT_MODAL_TEXT_1")}
        <span className={style.textGreen}>
          {"R$ "} {buypack.amountFiat}
        </span>
        {i18n.t("CREDIT_MODAL_TEXT_4")}
        <span className={style.textGreen}>
          {" "}
          {convertBiggestCoinUnit(buypack.amount, 8).toFixed(8)}{" "}
          {" " + buypack.coin.abbreviation.toUpperCase()}
        </span>
      </div>
    );
  };
  render() {
    const { loading, buypack, fee } = this.props;
    const { error, messageError, feeSelect } = this.state;

    if (loading) {
      return (
        <div className={style.modalBox}>
          <Loading color="lunes" />
        </div>
      );
    } else {
      return (
        <div className={style.modalBox}>
          <div>
            {error ? (
              <ModalBar type="error" message={messageError} timer />
            ) : null}
          </div>
          {buypack.servicePaymentMethodId === 6
            ? this.renderCreditPayment()
            : this.renderFee()}
          <ButtonContinue
            label={i18n.t("BTN_CONTINUE")}
            action={() => this.validateForm()}
            loading={loading}
          />
        </div>
      );
    }
  }
}

FeeBuy.propTypes = {
  setFeeBuy: PropTypes.func.isRequired,
  getFeeBuy: PropTypes.func.isRequired,
  setModalStep: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
  errorInput: PropTypes.func.isRequired,
  fee: PropTypes.object.isRequired,
  buypack: PropTypes.object.isRequired,
  wallet: PropTypes.any.isRequired,
  loading: PropTypes.bool.isRequired,
  coins: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  lunes: PropTypes.object,
  confirmBuy: PropTypes.func,
  creditBalance: PropTypes.object
};

const mapStateToProps = store => ({
  buypack: store.buy.buypackage,
  wallet: store.skeleton,
  loading: store.buy.loading,
  fee: store.buy.fee,
  price: store.skeleton.coins,
  coins: store.buy.coinsBuy,
  user: store.user.user,
  lunes: store.skeleton.coins.lunes,
  creditBalance: store.skeleton.creditBalance
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getFeeBuy,
      setFeeBuy,
      setModalStep,
      clearMessage,
      errorInput,
      confirmBuy
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeeBuy);
