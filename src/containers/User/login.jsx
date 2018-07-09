import React from "react";
import i18n from "../../utils/i18n";
import { Link } from "react-router-dom";

// STYLE
import style from "./style.css";

class Login extends React.Component {
  render() {
    return (
      <div className={style.formLogin}>
        <img src="../../images/logo.svg" className={style.logo} />
        <div className={style.description}>{i18n.t("LOGIN_HEADER")}</div>

        <input
          type="text"
          placeholder={i18n.t("PLACEHOLDER_EMAIL")}
          className={style.inputTextDefault}
        />
        <input
          type="password"
          placeholder={i18n.t("PLACEHOLDER_PASSWORD")}
          className={style.inputTextDefault}
        />

        <Link className={style.textForgetPass} to="/reset">
          {i18n.t("LOGIN_FORGET_PASSWORD_LINK")}
        </Link>

        <button className={style.buttonBorderGreen}>
          {i18n.t("BTN_LOGIN")}
        </button>

        <div className={style.doNotHaveAccount}>
          <Link className={style.doNotLink} to="/create">
            {i18n.t("LOGIN_SINGUP_ACCOUNT_LINK")}
          </Link>
        </div>

        <div className={style.footer}>
          <a href="#" className={style.footerLink}>
            {i18n.t("LOGIN_FOOTER_HOME")}
          </a>
          <span className={style.footerSpace}>|</span>
          <a href="#" className={style.footerLink}>
            {i18n.t("LOGIN_FOOTER_SUPPORT")}
          </a>
          <span className={style.footerSpace}>|</span>
          <a href="#" className={style.footerLink}>
            {i18n.t("LOGIN_FOOTER_LANG")}
          </a>
          <p>{i18n.t("LOGIN_FOOTER")}</p>
        </div>
      </div>
    );
  }
}

export default Login;
