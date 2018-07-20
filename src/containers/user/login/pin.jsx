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
      onChangeInputs: {
        onInput_1: false,
        onInput_2: false,
        onInput_3: false,
        onInput_4: false,
      },
      errors: undefined
    };
  }

  getInput = input => {
    let { name, value } = input;
    let { PIN } = this.state;
    let { onInput_1, onInput_2, onInput_3, onInput_4} = this.state;
    this.setState({
      ...this.state,
      PIN: { ...PIN, [name]: value },
      errors: undefined,
      onChangeInput: true,    
    });
    if(onInput_1===1){ this.setState({...this.state, onInput_1: true}) }
    if(onInput_2===1){ this.setState({...this.state, onInput_2: true}) }
    if(!onInput_3){ this.setState({...this.state, onInput_3: true}) }
    if(!onInput_4){ this.setState({...this.state, onInput_4: true}) }    
    return;
  };

  inputValidator = () => {
    let { clearMessage, errorInput } = this.props;
    let { PIN_1, PIN_2, PIN_3, PIN_4 } = this.state.PIN;
    let PIN = PIN_1 + PIN_2 + PIN_3 + PIN_4;
    let { errors, messageError } = inputValidator({ inputs: { type: "PIN", value: PIN } });

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
    let { errors, PIN, onInput_1, onInput_2, onInput_3, onInput_4 } = this.state;
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
              this.getInput(event.target.nodeName);
            }}
            className={errors ? style.inputPINError : onInput_1 ? style.inputBorderGreen : style.inputPINDefault}
          />
          <input
            type="password"
            name="PIN_2"
            maxLength="1"
            onChange={event => {
              this.getInput(event.target);
            }}
            className={errors ? style.inputPINError : onInput_2 ? style.inputBorderGreen : style.inputPINDefault}
          />

          <input
            type="password"
            name="PIN_3"
            maxLength="1"
            onChange={event => {
              this.getInput(event.target);
            }}
            className={errors ? style.inputPINError : onInput_3 ? style.inputBorderGreen : style.inputPINDefault}
          />

          <input
            type="password"
            name="PIN_4"
            maxLength="1"
            onChange={event => {
              this.getInput(event.target);
            }}
            className={errors ? style.inputPINError : onInput_4 ? style.inputBorderGreen : style.inputPINDefault}
          />
        </div>

        <div className={style.descriptionLinkPIN}>
          {i18n.t("PIN_FORGET_PIN_LINK")}
        </div>

        <button
          className={PIN.PIN_1 && PIN.PIN_2 && PIN.PIN_3 && PIN.PIN_4 ? style.buttonGreen : style.buttonBorderGreen}
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
