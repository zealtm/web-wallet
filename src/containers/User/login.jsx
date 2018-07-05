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
        <button type="text" className={style.buttonPurpleLight}> TESTE </button>
        <input type="text" className={style.inputTextDefault}/>
          Login
        </p>
      </div>
    );
  }
}

export default Login;
