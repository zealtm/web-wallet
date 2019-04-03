import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateUserConsents } from "../../user/redux/userAction";
import { setModalStep, confirmPay } from "../redux/paymentAction";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// UTILS
import i18n from "../../../utils/i18n";
import { formatCpfCnpj } from "../../../utils/strings";
import { convertBiggestCoinUnit } from "../../../utils/numbers";

// STYLES
import style from "./style.css";

// MATERIAL
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";

// COMPONENTS
import CustomSwitch from "../../../components/customSwitch";
import ButtonContinue from "../../../components/buttonContinue";
import ModalBar from "../../../components/modalBar";
import Loading from "../../../components/loading";

class DetailsPayment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: undefined,
      errorMsg: "",
      user: props.user
    };
  }

  validateForm = () => {
    const {
      setModalStep,
      errorInput,
      clearMessage,
      payment,
      coins,
      confirmPay,
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
    if (payment.servicePaymentMethodId === 4) {
      const payload = {
        coin: "lbrl",
        fromAddress: null,
        toAddress: null,
        lunesUserAddress: coins["lunes"].address,
        amount: payment.amount,
        fee: null,
        feePerByte: null,
        feeLunes: null,
        price: payment.amount,
        decimalPoint: null,
        servicePaymentMethodId: payment.servicePaymentMethodId,
        serviceCoinId: payment.serviceCoinId,
        payment: payment
      };
      if (creditsAvailable > payment.amount) {
        confirmPay(payload);
      }else {
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
  renderCrypto = () => {
    const { payment } = this.props;
    return (
      <div className={style.strongText} style={{ marginTop: 20 }}>
        <span className={style.textGreen}>
          {payment.amount.toFixed(8)} {payment.coin.abbreviation.toUpperCase()}
        </span>
        {i18n.t("PAYMENT_DETAILS_TEXT_2")}
        <span className={style.textGreen}>R$ {payment.value}</span>
        {i18n.t("PAYMENT_DETAILS_TEXT_3")}
      </div>
    );
  };
  renderCredit = () => {
    const { payment } = this.props;
    return (
      <div className={style.strongText} style={{ marginTop: 20 }}>
        {"Será debitado "}
        <span className={style.textGreen}>
          R$ {payment.value}
          {" do seu crédito com 1% de taxa de serviço "}
        </span>
        {i18n.t("PAYMENT_DETAILS_TEXT_2")}
        <span className={style.textGreen}> R$ {payment.amount} </span>
        {i18n.t("PAYMENT_DETAILS_TEXT_3")}
      </div>
    );
  };
  render() {
    const { loading, payment } = this.props;
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
          {i18n.t("PAYMENT_DETAILS_TEXT_1")}
          {payment.servicePaymentMethodId === 4
            ? this.renderCredit()
            : this.renderCrypto()}
          <Grid container className={style.inlineInfo}>
            <Grid item xs={6} md={3}>
              <label className={style.inlineInfoLabel}>
                {i18n.t("PAYMENT_TITLE_BANK")}
              </label>
              {payment.assignor}
            </Grid>
            <Grid item xs={6} md={3}>
              <label className={style.inlineInfoLabel}>
                {i18n.t("PAYMENT_TITLE_NAME")}
              </label>
              {payment.name}
            </Grid>
            <Grid item xs={6} md={2}>
              <label className={style.inlineInfoLabel}>
                {i18n.t("PAYMENT_TITLE_DATE")}
              </label>
              {payment.dueDate}
            </Grid>
            <Grid item xs={6} md={2} style={{ padding: "0" }}>
              <label
                className={style.inlineInfoLabel}
                style={{ padding: "10px" }}
              >
                {i18n.t("PAYMENT_TITLE_DOC")}
              </label>
              <p style={{ marginTop: "-10px" }}>
                {formatCpfCnpj(payment.cpfCnpj)}
              </p>
            </Grid>
            <Hidden smDown>
              <Grid item xs={6} md={2}>
                <label className={style.inlineInfoLabel}>
                  {i18n.t("PAYMENT_TITLE_VALUE")}
                </label>
                R$ {payment.value}
              </Grid>
            </Hidden>
          </Grid>
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

DetailsPayment.propTypes = {
  payment: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  setModalStep: PropTypes.func.isRequired,
  updateUserConsents: PropTypes.func.isRequired,
  clearMessage: PropTypes.func,
  errorInput: PropTypes.func,
  coins: PropTypes.array.isRequired,
  confirmPay: PropTypes.func.isRequired,
  creditBalance: PropTypes.object
};

const mapStateToProps = store => ({
  payment: store.payment.payment,
  loading: store.payment.loading,
  user: store.user.user,
  coins: store.skeleton.coins,
  creditBalance: store.skeleton.creditBalance
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateUserConsents,
      setModalStep,
      clearMessage,
      errorInput,
      confirmPay
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsPayment);
