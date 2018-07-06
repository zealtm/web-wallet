import React from "react";
import i18n from "../../utils/i18n";
import { Link } from "react-router-dom";

// STYLE
import style from "./style.css";

class Login extends React.Component {
  render() {
    return (
      <div className={style.formLogin}>
        {/* <p>{i18n.t("SUBMIT")}</p> */}

        <img src="../../images/logo.svg" className={style.logo} />
        <div className={style.description}>Entre com seus dados</div>

        <input
          type="text"
          placeholder="nome@email.com"
          className={style.inputTextDefault}
        />
        <input
          type="password"
          placeholder="Senha"
          className={style.inputTextDefault}
        />

        <Link className={style.textForgetPass} to="/reset">
          Esqueceu sua senha?
        </Link>

        <button className={style.buttonBorderGreen}> ENTRAR </button>

        <div className={style.doNotHaveAccount}>
          Não tem uma conta?{" "}
          <Link className={style.doNotLink} to="/create">
            Inscrever-se
          </Link>
        </div>

        <div className={style.footer}>
          <a href="#" className={style.footerLink}>
            Principal
          </a>
          <span className={style.footerSpace}>|</span>
          <a href="#" className={style.footerLink}>
            Support
          </a>
          <span className={style.footerSpace}>|</span>
          <a href="#" className={style.footerLink}>
            Português
          </a>
          <p>2018 lunes.io All Rights Reserved</p>
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

export default Login;
