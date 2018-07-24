import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { authenticate } from "../redux/userAction";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// STYLE
import style from "../style.css";

// UTILS
import { inputValidator } from "../../../utils/inputValidator";
import i18n from "../../../utils/i18n";

class Pin extends React.Component {
  constructor() {
    super();
    this.state = {
      inputs: {
        PIN: undefined
      },
      PIN: {
        PIN_1: undefined,
        PIN_2: undefined,
        PIN_3: undefined,
        PIN_4: undefined
      },
      errors: undefined
    };
  }

  getInput = input => {
    let { name, value } = input;
    let { PIN } = this.state;
    this.setState({
      ...this.state,
      PIN: { ...PIN, [name]: value },
      errors: undefined,
    });
    return;
  };

  inputValidator = () => {
    let { clearMessage, errorInput } = this.props;
    let { PIN_1, PIN_2, PIN_3, PIN_4 } = this.state.PIN;
    let pin = PIN_1 + PIN_2 + PIN_3 + PIN_4;
    let inputPin = { type: "password" , name: "PIN", value: pin, placeholder: "PIN", required: true}
    let { errors, messageError } = inputValidator({ inputs: inputPin });

    if (errors.length > 0) {
      errorInput(messageError);
      this.setState({
        ...this.state,
        errors,
      });
    } else {
      clearMessage();

      // CÓDIGO

    }

    return;
  };

  render() {
    let { errors, PIN } = this.state;

    return (
      <div className={style.contGeneral}>
        <img src="../../../images/logo.svg" className={style.logo} />
        <div className={style.descriptionPIN}>{i18n.t("PIN_HEADER")}</div>

        <div className={style.alignInputsDefault}>

          <input
            type="password"
            name="PIN_1"
            maxLength="1"
            onChange={event => {
              this.getInput(event.target);
            }}
            className={errors ? style.inputPINError : style.inputPINDefault}
          />
          <input
            type="password"
            name="PIN_2"
            maxLength="1"
            onChange={event => {
              this.getInput(event.target);
            }}
            className={errors ? style.inputPINError : style.inputPINDefault}
          />

          <input
            type="password"
            name="PIN_3"
            maxLength="1"
            onChange={event => {
              this.getInput(event.target);
            }}
            className={errors ? style.inputPINError : style.inputPINDefault}
          />

          <input
            type="password"
            name="PIN_4"
            maxLength="1"
            onChange={event => {
              this.getInput(event.target);
            }}
            className={errors ? style.inputPINError : style.inputPINDefault}
          />
        </div>

        <div className={style.descriptionLinkPIN}>
          {i18n.t("PIN_FORGET_PIN_LINK")}
        </div>

        <button
          className={
            PIN.PIN_1
              && PIN.PIN_2
              && PIN.PIN_3
              && PIN.PIN_4
              ? style.buttonGreen
              : style.buttonBorderGreen}
          onClick={() => this.inputValidator()}
        >
          {i18n.t("BTN_LOGIN")}

        </button>

      </div>
    );
  }
}

Pin.propTypes = {
  authenticate: PropTypes.func,
  clearMessage: PropTypes.func,
  errorInput: PropTypes.func
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      authenticate,
      clearMessage,
      errorInput
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(Pin);
