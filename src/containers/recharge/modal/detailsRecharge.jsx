import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalStep, confirmRecharge } from "../redux/rechargeAction";

import { updateUserConsents } from "../../user/redux/userAction";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// UTILS
import i18n from "../../../utils/i18n";
import { convertBiggestCoinUnit } from "../../../utils/numbers";
// STYLES
import style from "./style.css";

// COMPONENTS
import CustomSwitch from "../../../components/customSwitch";
import ButtonContinue from "../../../components/buttonContinue";
import ModalBar from "../../../components/modalBar";
import Loading from "../../../components/loading";

class DetailsRecharge extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: undefined,
      errorMsg: "",
      user: props.user
    };

    this.renderNumber = this.renderNumber.bind(this);
  }

  validateForm = () => {
    const {
      setModalStep,
      errorInput,
      clearMessage,
      recharge,
      confirmRecharge,
      lunes,
      creditBalance
    } = this.props;
    const { user } = this.state;
    let creditsAvailable = convertBiggestCoinUnit(
      creditBalance.available,
      8
    ).toFixed(2);
    if (user.terms === "unread") {
      errorInput(i18n.t("PAYMENT_TERMS_ERROR"));
      return;
    }
    if (recharge.servicePaymentMethodId === 2) {
      let payload = {
        coin: "lbrl",
        fromAddress: null,
        toAddress: null,
        lunesUserAddress: lunes.address,
        amount: recharge.amount,
        fee: null,
        feePerByte: null,
        feeLunes: null,
        price: recharge.amount,
        decimalPoint: null,
        user: user.password,
        recharge: recharge,
        servicePaymentMethodId: recharge.servicePaymentMethodId,
        serviceCoinId: recharge.serviceCoinId
      };
      
      if(creditsAvailable > Number(recharge.amount)){
        confirmRecharge(payload);
      }else{
        this.setState({error: true, errorMsg: i18n.t("INSUFFICIENT_CREDIT")});
      }
    } else {
      setModalStep(2);
    }

    clearMessage();
  };

  toogleSwitch = () => {
    const { user } = this.state;
    const { updateUserConsents } = this.props;
    const newStatus = user.terms === "read" ? "unread" : "read";

    this.setState({
      ...this.state,
      user: {
        ...user,
        terms: newStatus
      }
    });

    updateUserConsents({ terms: newStatus });
  };

  renderNumber() {
    const { recharge } = this.props;

    const ddd = recharge.number.substring(0, 2);
    const totalnumero = recharge.number.length;
    const numero = recharge.number.substring(2, totalnumero);

    return `(${ddd}) ${numero}`;
  }
  renderCredit = () => {
    const { recharge } = this.props;
    return (
      <div className={style.strongText} style={{ marginTop: 20 }}>
        {i18n.t("CREDIT_MODAL_TEXT_1")}
        <span className={style.textGreen}>
          {"R$ "} {recharge.amount}
        </span>
        {i18n.t("CREDIT_MODAL_TEXT_2")}
        <span className={style.textGreen}>R$ {recharge.value}</span>
        {i18n.t("CREDIT_MODAL_TEXT_3")}
      </div>
    );
  };
  renderCrypto = () => {
    const { recharge } = this.props;
    return (
      <div className={style.strongText} style={{ marginTop: 20 }}>
        <span className={style.textGreen}>
          {parseFloat(recharge.amount).toFixed(8)}{" "}
          {recharge.coin.abbreviation.toUpperCase()}
        </span>
        {i18n.t("RECHARGE_DETAILS_2")}
        <span className={style.textGreen}>R$ {recharge.value}</span>

        {i18n.t("RECHARGE_DETAILS_3")}
      </div>
    );
  };

  render() {
    const { loading, recharge, valueError } = this.props;
    const { user, error, errorMsg } = this.state;

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
            {error ? <ModalBar type="error" message={errorMsg} timer /> : null}
          </div>
          {i18n.t("RECHARGE_DETAILS_1")}
          {recharge.servicePaymentMethodId === 2
            ? this.renderCredit()
            : this.renderCrypto()}

          <div
            style={{
              fontSize: "24px",
              textAlign: "center",
              marginTop: 30,
              marginBottom: 30
            }}
          >
            {this.renderNumber()}
          </div>

          <CustomSwitch
            title={i18n.t("PAYMENT_TERMS_TITLE")}
            description={i18n.t("PAYMENT_TERMS_DESC")}
            action={this.toogleSwitch}
            checked={user.terms === "read"}
            value="termsSwitch"
          />

          <ButtonContinue
            label={i18n.t("BTN_CONFIRM")}
            action={() => this.validateForm()}
            loading={loading}
          />
        </div>
      );
    }
  }
}

DetailsRecharge.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object.isRequired,
  setModalStep: PropTypes.func,
  recharge: PropTypes.object.isRequired,
  updateUserConsents: PropTypes.func.isRequired,
  clearMessage: PropTypes.func,
  errorInput: PropTypes.func,
  confirmRecharge: PropTypes.func.isRequired,
  lunes: PropTypes.object,
  creditBalance: PropTypes.object
};

const mapStateToProps = store => ({
  loading: store.recharge.loading,
  user: store.user.user,
  recharge: store.recharge.recharge,
  lunes: store.skeleton.coins.lunes,
  creditBalance: store.skeleton.creditBalance
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setModalStep,
      updateUserConsents,
      clearMessage,
      errorInput,
      confirmRecharge
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsRecharge);
