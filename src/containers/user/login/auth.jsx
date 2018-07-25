import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { authenticate } from "../redux/userAction";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// COMPONENTS
import Footer from "../footer";

// UTILS
import { inputValidator } from "../../../utils/inputValidator";
import i18n from "../../../utils/i18n";

// STYLE
import style from "../style.css";

const mapSateToProps = store => ({
  user: store.user,
  error: store.error
});

class Auth extends React.Component {
  constructor() {
    super();
    this.state = {
      inputs: {
        emailUsername: undefined,
        password: undefined
      },
      errors: undefined
    };
  }

  getInput = input => {
    let { name, value } = input;
    let { inputs } = this.state;

    this.setState({
      ...this.state,
      inputs: { ...inputs, [name]: value ? input : undefined },
      errors: undefined
    });
  };

  inputValidator = () => {
    let { inputs } = this.state;
    let { emailUsername, password } = this.state.inputs;
    let { errorInput, authenticate } = this.props;
    let { messageError, errors } = inputValidator(inputs);
    console.warn(messageError)
    if (errors.length > 0) {
      errorInput(messageError);
      this.setState({
        ...this.state,
        errors
      });
    } else {
      clearMessage();
      authenticate(emailUsername.value, password.value);
    }
  };

  render() {
    let { inputs, errors } = this.state;

    return (
      <div className={style.contGeneral}>
        <img src="../../images/logo.svg" className={style.logo} />
        <div className={style.description}>{i18n.t("LOGIN_HEADER")}</div>

        <input
          type="email"
          name="emailUsername"
          required
          placeholder={i18n.t("PLACEHOLDER_USERNAME_EMAIL")}
          onChange={event => {
            this.getInput(event.target);
          }}
          className={
            errors && errors.includes("emailUsername")
              ? style.inputTextError
              : style.inputTextDefault
          }
        />
        <input
          type="password"
          name="password"
          required
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

        <Link className={style.textForgetPass} to="/reset">
          {i18n.t("LOGIN_FORGET_PASSWORD_LINK")}
        </Link>

        <button
          className={
            inputs.emailUsername && inputs.password && !errors
              ? style.buttonGreen
              : style.buttonBorderGreen
          }
          onClick={() => {
            this.inputValidator();
          }}
        >
          {i18n.t("BTN_LOGIN")}
        </button>

        <div className={style.doNotHaveAccount}>
          {i18n.t("LOGIN_CREATE_ACCOUNT_LABEL")}{" "}
          <Link className={style.doNotLink} to="/create">
            {i18n.t("LOGIN_SINGUP_ACCOUNT_LINK")}
          </Link>
        </div>

        <Footer />
      </div>
    );
  }
}

Auth.propTypes = {
  authenticate: PropTypes.func,
  clearMessage: PropTypes.func,
  errorInput: PropTypes.func,
  user: PropTypes.object,
  error: PropTypes.object
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
  mapSateToProps,
  mapDispatchToProps
)(Auth);
