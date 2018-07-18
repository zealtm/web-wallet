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

class PIN extends React.Component {
  constructor() {
    super()
    this.state = {
      inputs: {
        field1: undefined,
        field2: undefined,
        field3: undefined,
        field4: undefined,
      },
      errors: undefined,
      messageErrorPIN: "Digite o código correto"
    }
  }

  getInput = (input) => {
    let { name, value } = input;
    let { inputs } = this.state;
    this.setState({
      ...this.state,
      inputs: { ...inputs, [name]: { type: name, value } },
      errors: undefined
    });
  };

  inputValidator = () => {
    let { clearMessage, errorInput } = this.props
    let { inputs,messageErrorPIN } = this.state;
    let {  errors } = inputValidator(inputs);
    if (errors.length > 0) {
      errorInput(messageErrorPIN);
      this.setState({
        ...this.state,
        errors,
        messageErrorPIN
      });
    } else {
      clearMessage();
      alert("Logado!");
    }
  };

  render() {
    let { errors } = this.state;
    return (
      <div className={style.contGeneral}>
        <img src="../../../images/logo.svg" className={style.logo} />
        <div className={style.descriptionPIN}>{i18n.t("PIN_HEADER")}</div>

        <div className={style.alignInputsDefault}>

          <input
            type="password"
            name="field1"
            maxLength="1"
            onChange={event => { this.getInput(event.target); }}
            className={errors ? style.inputErrorPIN1 : style.inputPINDefault1}
          />
          <input
            type="password"
            name="field2"
            maxLength="1"
            onChange={event => { this.getInput(event.target); }}
            className={errors ? style.inputErrorPIN : style.inputPINDefault}
          />
          <input
            type="password"
            name="field3"
            maxLength="1"
            onChange={event => { this.getInput(event.target); }}
            className={errors ? style.inputErrorPIN : style.inputPINDefault}
          />
          <input
            type="password"
            name="field4"
            maxLength="1"
            onChange={event => { this.getInput(event.target); }}
            className={errors ? style.inputErrorPIN4 : style.inputPINDefault4}
          />
        </div>

        <div className={style.descriptionLinkPIN}>{i18n.t("PIN_FORGET_PIN_LINK")}</div>

        <button className={style.buttonBorderGreen} onClick={() => this.inputValidator()}>
          {i18n.t("BTN_LOGIN")}
        </button>

      </div>
    );
  }
}



PIN.propTypes = {
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
)(PIN);


