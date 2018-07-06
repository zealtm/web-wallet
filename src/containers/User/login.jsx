import React from "react";
import i18n from "../../utils/i18n";

// COMPONENTS
import ModalBar from "../../components/modalBar";

// STYLE
import style from "./style.css";
class Login extends React.Component {

  render() {
    return (
      <div>
        <ModalBar type="success" message="Mensagem de teste Mensagem"/>
        <p>{i18n.t("SUBMIT")} Teste</p>
        <p className={style.formLogin}>
          Login
        </p>
      </div>
    );
  }
}

export default Login;
