import React from "react";
import PropTypes from "prop-types";
import i18n from "../../utils/i18n";
import { Link } from "react-router-dom";
// MATERIAL
import { withStyles } from "@material-ui/core/styles";
// STYLE
import style from "./style.css";

// local classes
const styles = {};

class Login extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={style.formLogin}>
        {/* <p>{i18n.t("SUBMIT")}</p> */}

        <img src="../../images/logo.svg" className={style.logo} />
        <div className={style.description}>Entre com seus dados</div>

        <input
          type="text"
          placeholder={i18n.t("PLACEHOLDER_EMAIL")}
          className={style.inputTextDefault}
        />
        <input
          type="password"
          placeholder={i18n.t("PLACEHOLDER_PASS")}
          className={style.inputTextDefault}
        />

        <Link className={style.textForgetPass} to="/reset">
          {i18n.t("FORGET_PASS")}
        </Link>

        <button className={style.buttonBorderGreen}>
          {" "}
          {i18n.t("BT_LOGIN")}{" "}
        </button>

        <div className={style.doNotHaveAccount}>
          {i18n.t("CREATE_ACCOUNT_LABEL")}{" "}
          <Link className={style.doNotLink} to="/create">
            {i18n.t("CREATE_ACCOUNT")}
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

        {/* <p className={style.formLogin}>
          <button className={style.buttonPurpleLight}> TESTE </button>
          <input type="text" className={style.inputTextDefault} />
          Login
        </p> */}
      </div>
    );
  }
}

Login.protoTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
