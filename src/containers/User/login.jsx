import React from "react";
import i18n from "../../utils/i18n";

// STYLE
import style from "./style.css";
class Login extends React.Component {

  render() {
    return (
      <div>
        <p>{i18n.t("SUBMIT")}</p>
        <p className={style.formLogin}>
          Login
        </p>
      </div>
    );
  }
}

export default Login;
