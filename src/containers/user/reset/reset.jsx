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
import i18n from "../../../utils/i18n";
import { inputValidator } from "../../../utils/inputValidator";

// STYLE
import style from "../style.css";

class Reset extends React.Component {
  constructor() {
    super();
    this.state = {
      step: 0,
      inputs: {
        emailUsername: undefined
      },
      errors: undefined
    }
  }

  getInput = (input) => {
    let { name, value } = input;
    this.setState({
      ...this.state,
      inputs: { ...this.state.inputs, [name]: { type: name, value } },
      errors: undefined
    });
  };

  inputValidator = () => {
    let { clearMessage, errorInput } = this.props
    let { inputs, step } = this.state;
    let { emailUsername } = inputs;
    let { messageError, errors } = inputValidator(inputs);

    if (errors.length > 0) {
      errorInput(messageError);
      this.setState({
        ...this.state,
        errors
      });
    } else {
      clearMessage();
      authenticate(emailUsername.value);
      this.setState({ step: step + 1 });
    }
  };

  cont_1 = () => {
    let { errors } = this.state;
    return (
      <div>
        <Link to="/login">
          <img src="../../images/icons/arrow/arrow-white-left@2x.png" className={style.iconArrowBack} />
        </Link>

        <img src="../../images/logo.svg" className={style.logoReset} />
        <img
          src="../../../../images/icons/email/ic-email.png"
          className={style.iconEmail}
        />

        <div className={style.resetHeader}>{i18n.t("RESET_HEADER")}</div>

        <input
          type="email"
          name="emailUsername"
          placeholder={i18n.t("PLACEHOLDER_EMAIL")}
          onChange={event => { this.getInput(event.target); }}
          className={errors && errors.includes('emailUsername') ? style.inputTextError : style.inputTextDefault}
        />

        <div className={style.resetInstruction}>
          {i18n.t("RESET_INSTRUCTIONS")}
          <br />
          {i18n.t("RESET_INSTRUCTIONS2")}
        </div>

        <button className={style.buttonBorderGreen} onClick={() => this.inputValidator()}>
          {i18n.t("BTN_RESET")}
        </button>
      </div>
    )
  }

  cont_2 = () => {
    return (
      <div>
        <Link to="/login">
          <img src="../../images/icons/arrow/arrow-white-left@2x.png" className={style.iconArrowBack} />
        </Link>

        <img src="../../images/logo.svg" className={style.logoReset} />
        <img
          src="../../../../images/icons/email/ic-email.png"
          className={style.iconEmail}
        />

        <div className={style.resetEmailSend}>{i18n.t("RESET_EMAIL_SENDED")}</div>

        <button className={style.buttonBorderGreen}>
          <Link className={style.resetLinkLogin} to="/login">
            {i18n.t("BTN_LOGIN")}
          </Link>
        </button>

      </div>
    )
  }

  render() {
    let { step } = this.state
    let contents = [this.cont_1(), this.cont_2()];
    return (
      <div className={style.contGeneral}>

        {contents[step]}

        <Footer />

      </div>
    );
  }
}


Reset.propTypes = {
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
)(Reset);
