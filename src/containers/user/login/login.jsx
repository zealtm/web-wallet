import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { authenticate } from "../redux/userAction";
import i18n from "../../../utils/i18n";
import { Link } from "react-router-dom";

// COMPONENTS
import Footer from "../footer";

// STYLE
import style from "../style.css";

class Login extends React.Component {
  constructor() {
    super()

    this.state = {
      email: "",
      password: ""
    }
  }

  render() {
    const props = this.props;
    const state = this.state;

    return (
      <div className={style.contGeneral}>
        <img src="../../images/logo.svg" className={style.logo} />
        <div className={style.description}>{i18n.t("LOGIN_HEADER")}</div>

        <input
          type="text"
          placeholder={i18n.t("PLACEHOLDER_EMAIL")}
          onChange={(event) => this.setState({ email: event.target.value })}
          className={style.inputTextDefault}
        />
        <input
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
          onClick={() => props.authenticate(state.email, state.password)}>
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

const mapDispatchToProps = dispatch => bindActionCreators({
  authenticate
}, dispatch);

export default connect(null, mapDispatchToProps)(Login);
