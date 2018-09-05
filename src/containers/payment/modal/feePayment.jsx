import React from "react";
import PropTypes from "prop-types";

// REDUX 
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getFee} from "../redux/paymentAction";

// UTILS
import i18n from "../../../utils/i18n";

// STYLES
import style from "./style.css";

class FeePayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fee: null
    }
  }

  calcFee(type) {
    return null; // implemento o metodo de fee
  }

  validateForm = () => {
    const { handleStep } = this.props;

    handleStep("next"); // validar a selecao de fee aqui
  }

  render() {
    const { loading, payment } = this.props;

    return (
      <div className={style.modalBox}>
        <img
          src={"/images/icons/coins/LUNES.png"}
          className={style.modalIconCoin}
        />
        <div>
          <span>{i18n.t("PAYMENT_FEE_TEXT_1")}</span>
          <span className={style.totalConfirm}>5000 LUNES</span>
        </div>
        <div>
          <span>{i18n.t("PAYMENT_FEE_TEXT_2")}</span>
          <span className={style.addressConfirm}>{i18n.t("PAYMENT_MODAL_TITLE")}</span>
        </div>

        <div className={style.confirmFee}>
          <div>
            {i18n.t("PAYMENT_FEE_AMOUNT")}<span> LUNES </span> é
          </div>
          <div className={style.txtamount}>0.001</div>
        </div>

        <div className={style.boxFee}>
          <span
            className={style.greenLabelFee}
            onClick={() => this.calcFee("low")}
          >
            {i18n.t("FEE_LOW")} 0.001
          </span>
          <span
            className={style.yellowLabelFee}
            onClick={() => this.calcFee("medium")}
          >
            {i18n.t("FEE_MEDIUM")} 0.001
          </span>
          <span
            className={style.redLabelFee}
            onClick={() => this.calcFee("high")}
          >
            {i18n.t("FEE_HIGHT")} 0.001
          </span>
        </div>

        <button className={style.btContinue} onClick={() => this.validateForm()}>
          {i18n.t("BTN_CONTINUE")}
        </button>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  payment: store.payment.payment,
  loading: store.payment.loading
});

const mapDispatchToProps = dispatch =>bindActionCreators(
  {
    getFee
  }, 
  dispatch
);

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(FeePayment);
