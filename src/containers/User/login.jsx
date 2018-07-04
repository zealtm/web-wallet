import React from "react";
import style from "./style.css";
import i18n from "../../utils/i18n";

class Login extends React.Component {

  render() {
    return (
      <div>
        <p>{i18n.t("SUBMIT")} Teste</p>
        <p className={style.formLogin}>
          Login
        </p>
      </div>
    );
  }
}

export default Login;
