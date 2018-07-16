import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// COMPONENTS
import Footer from "../footer";
import { authenticate } from "../redux/userAction";

// UTILS
import { FormValidator } from "../../../utils/formValidator"
import i18n from "../../../utils/i18n";

// STYLE
import style from "../style.css";

class Login extends React.Component {
  constructor() {
    super()

    this.state = {
      email: undefined,
      password: undefined
    }
  }

  componentDidMount() {
    let teste = FormValidator;
    console.warn(teste);
  }

  getInput = (input) => {
    let { name, value } = input;
    this.setState({ ...this.state, name: { type: name, value }  })
  }

  // return authenticate(email, password)

  render() {
    return (
      <div className={style.contGeneral}>
        <img src="../../images/logo.svg" className={style.logo} />
        <div className={style.description}>{i18n.t("LOGIN_HEADER")}</div>

        <input
          type="email"
          name="email"
          placeholder={i18n.t("PLACEHOLDER_EMAIL")}
          onChange={(event) => this.getInput(event.target)}
          className={style.inputTextDefault}
        />
        <input
          name="password"
          type="password"
          placeholder={i18n.t("PLACEHOLDER_PASSWORD")}
          onChange={(event) => this.setState({ password: event.target.value })}
          className={style.inputTextDefault}
        />

        <Link className={style.textForgetPass} to="/reset">
          {i18n.t("LOGIN_FORGET_PASSWORD_LINK")}
        </Link>

        <button
          className={style.buttonBorderGreen}
          onClick={() => this.inputValidator()}>
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

Login.propTypes = {
  authenticate: PropTypes.func,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  authenticate
}, dispatch);

export default connect(null, mapDispatchToProps)(Login);
