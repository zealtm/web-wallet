import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalStep } from "../redux/rechargeAction";
import { errorInput } from "../../errors/redux/errorAction";
import i18n from "../../../utils/i18n";
import style from "./style.css";

class SecureRecharge extends React.Component {
  constructor() {
    super();
    this.state = {
      password: ""
    };
  }

  setPassword = password => {
    this.setState({ ...this.state, password });
  };

  confirmPassword = () => {
    this.props.setModalStep(5);
  };

  render() {
    let { password } = this.state;

    return (
      <div className={style.modalBox}>
        <img
          src="/images/icons/privacy/privacy.png"
          className={style.modalIconCoin}
        />
        <div>
          <span>{i18n.t("PAYMENT_PASS_CONFIRMATION")}</span>
          <span className={style.totalConfirm}>5000.001 LUNES</span>
          <span> {i18n.t("PAYMENT_PASS_TO")} </span>
          <span className={style.addressConfirm}>
            {i18n.t("PAYMENT_MODAL_TITLE")}
          </span>
        </div>

        <div className={style.confirmFee}>
          <input
            type="password"
            name="txtpass"
            placeholder="*********"
            onChange={event => this.setPassword(event.target.value)}
            value={password}
            className={style.inputTextDefault}
          />
        </div>

        <button
          className={style.btContinue}
          onClick={() => this.confirmPassword()}
        >
          {i18n.t("BTN_CONFIRM")}
        </button>
      </div>
    );
  }
}

SecureRecharge.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  confirmPay: PropTypes.func,
  errorInput: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  loading: store.recharge.loading,
  user: store.user.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setModalStep,
      errorInput
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecureRecharge);
