import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { authenticate } from "../redux/userAction";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// UTILS
import { inputValidator } from "../../../utils/inputValidator";
import i18n from "../../../utils/i18n";

// STYLE
import style from "../style.css";
import CustomCheckbox from "../../../components/checkBox";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputs: {
        lastName: undefined,
        firstName: undefined,
        email: undefined,
        password: undefined,
        passwordRepeat: undefined,
        checkbox: {
          checkboxTerms: {
            checked: false,
            required: true
          },
          checkboxTesteR: {
            checked: false,
            required: true
          },
          checkboxTesteNR: {
            checked: false,
            required: false
          }
        }
      },
      step: 0,
      errors: undefined
    };
  }

  getInput = input => {
    let { inputs } = this.state;
    let { name, type, value } = input;

    if (type === "checkbox") {
      this.setState({
        ...this.state,
        inputs: {
          ...inputs,
          checkbox: {
            ...inputs.checkbox,
            [name]: {
              ...inputs.checkbox[name],
              checked: !inputs.checkbox[name].checked
            }
          }
        },
        errors: undefined
      });
    } else {
      this.setState({
        ...this.state,
        inputs: { ...inputs, [name]: { type: name, value } },
        errors: undefined
      });
    }
  };

  inputValidator = () => {
    let { clearMessage, errorInput, authenticate } = this.props;
    let { inputs, step } = this.state;
    let { email, password, passwordRepeat } = inputs;
    let { messageError, errors } = inputValidator(inputs);
    if (errors.length > 0) {
      errorInput(messageError);
      this.setState({
        ...this.state,
        errors
      });
    } else {
      clearMessage();
      authenticate(email.value, password.value, passwordRepeat.value);
      this.setState({ step: step + 1 });
    }
  };

  container_1 = () => {
    let { errors } = this.state;
    let {
      checkboxTerms,
      checkboxTesteR,
      checkboxTesteNR
    } = this.state.inputs.checkbox;

    return (
      <div>
        <div className={style.newAccountHeader}>
          {i18n.t("NEW_ACCOUNT_HEADER")}
        </div>

        <input
          type="text"
          name="firstName"
          placeholder={i18n.t("PLACEHOLDER_FIRST_NAME")}
          onChange={event => {
            this.getInput(event.target);
          }}
          className={
            errors && errors.includes("firstName")
              ? style.inputTextError
              : style.inputTextDefault
          }
        />

        <input
          type="text"
          name="lastName"
          placeholder={i18n.t("PLACEHOLDER_LAST_NAME")}
          onChange={event => {
            this.getInput(event.target);
          }}
          className={
            errors && errors.includes("lastName")
              ? style.inputTextError
              : style.inputTextDefault
          }
        />
        <input
          type="email"
          name="email"
          placeholder={i18n.t("PLACEHOLDER_USER_EMAIL")}
          onChange={event => {
            this.getInput(event.target);
          }}
          className={
            errors && errors.includes("email")
              ? style.inputTextError
              : style.inputTextDefault
          }
        />

        <input
          type="password"
          name="password"
          placeholder={i18n.t("PLACEHOLDER_PASSWORD")}
          onChange={event => {
            this.getInput(event.target);
          }}
          className={
            errors && errors.includes("password")
              ? style.inputTextError
              : style.inputTextDefault
          }
        />

        <input
          type="password"
          name="passwordRepeat"
          placeholder={i18n.t("PLACEHOLDER_PASSWORD_REPEAT")}
          onChange={event => {
            this.getInput(event.target);
          }}
          className={
            errors && errors.includes("passwordRepeat")
              ? style.inputTextError
              : style.inputTextDefault
          }
        />

        <div className={style.alignInfoTermsOfServices}>
          <CustomCheckbox
            type="checkbox"
            name="checkboxTerms"
            checked={checkboxTerms.checked}
            onChange={event => {
              this.getInput(event.target);
            }}
          />
          <CustomCheckbox
            type="checkbox"
            name="checkboxTesteR"
            checked={checkboxTesteR.checked}
            onChange={event => {
              this.getInput(event.target);
            }}
          />
          <CustomCheckbox
            type="checkbox"
            name="checkboxTesteNR"
            checked={checkboxTesteNR.checked}
            onChange={event => {
              this.getInput(event.target);
            }}
          />

          <div className={style.acceptTermsOfServices}>
            {i18n.t("NEW_ACCOUNT_ACCEPT_TERMS")}
          </div>
          <Link className={style.linkTermsOfServices} to="#">
            {i18n.t("NEW_ACCOUNT_TERMS_OF_SERVICES")}
          </Link>
        </div>

        <button
          className={style.buttonBorderGreen}
          onClick={() => {
            this.inputValidator();
          }}
        >
          {i18n.t("BTN_LOGIN")}
        </button>
      </div>
    );
  };

  container_2 = () => {
    return (
      <div>
        <img
          src="../../../../images/create/ic-email@2x.png"
          className={style.iconEmailCreateAccount}
        />

        <div className={style.messageConfirmationRegister}>
          {i18n.t("NEW_ACCOUNT_MESSAGE_SENDED")}
        </div>

        <div className={style.arrowToLoginAlign}>
          <div className={style.arrowToLogin}>
            <Link to="/login">
              <img src="../../../../images/create/arrow.png" />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  render() {
    let { step } = this.state;
    let contents = [this.container_1(), this.container_2()];

    return (
      <div className={style.contGeneral}>
        <img src="../../images/logo.svg" className={style.logo} />

        {contents[step]}
      </div>
    );
  }
}

Login.propTypes = {
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
)(Login);
