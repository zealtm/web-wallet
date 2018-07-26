import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loading, verifyUserPin, createUserPin } from "../redux/userAction";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// COMPONENTS
import Loading from "../../../components/loading";

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
      errors: undefined
    });
    return;
  };

  inputValidator = () => {
    let { user, loading, verifyUserPin, createUserPin, clearMessage, errorInput } = this.props;
    let { PIN_1, PIN_2, PIN_3, PIN_4 } = this.state.PIN;
    let pin = PIN_1 + PIN_2 + PIN_3 + PIN_4;
    let inputPin = {
      type: "password",
      name: "PIN",
      value: pin,
      placeholder: "PIN",
      required: true
    };
    let { errors, messageError } = inputValidator({ inputs: inputPin });

    if (errors.length > 0) {
      errorInput(messageError);
      return this.setState({
        ...this.state,
        errors
      });
    } else {
      loading();
      clearMessage();
      user.user.pin ? verifyUserPin(pin) : createUserPin(pin);
    }
  };

  render() {
    let { loading, user } = this.props.user;
    let { errors, PIN } = this.state;

    return (
      <div className={style.contGeneral}>
        <img src="../../../images/logo.svg" className={style.logo} />
        <div className={style.descriptionPIN}>
          {user.pin ? i18n.t("PIN_ENTER") : i18n.t("PIN_CREATE")}
        </div>
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
            PIN.PIN_1 && PIN.PIN_2 && PIN.PIN_3 && PIN.PIN_4
              ? style.buttonEnable
              : style.buttonBorderGreen
          }
          onClick={() => this.inputValidator()}
        >
          {loading ? <Loading /> : i18n.t("BTN_CONFIRM_PIN")}
        </button>
      </div>
    );
  }
}

Pin.propTypes = {
  loading: PropTypes.func,
  clearMessage: PropTypes.func,
  errorInput: PropTypes.func,
  createUserPin: PropTypes.func,
  verifyUserPin: PropTypes.func,
  user: PropTypes.object
};

const mapSateToProps = store => ({
  user: store.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loading,
      verifyUserPin,
      createUserPin,
      clearMessage,
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(Pin);
