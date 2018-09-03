import React from "react";
import PropTypes from "prop-types";

// STYLE
import style from "./style.css";

class SecurePayment extends React.Component {
  constructor() {
    super();
    this.state = {
      password: ""
    };
  }

  setPassword = password => {
    this.setState({ ...this.state, password });
  };

  confirmPassword = () => {
    let { password } = this.state;

    // if de validacao e proximo passo aqui
    return;
  };

  render() {
    let { password } = this.state;
    let {handleStep} = this.props;

    return (
      <div className={style.modalBox}>
        <img
          src="/images/icons/privacy/privacy.png"
          className={style.modalIconCoin}
        />
        <div>
          <span>
            Para confirmar sua transação, informe sua senha e conclua o envio de{" "}
          </span>
          <span className={style.totalConfirm}>
            5000 LUNES
          </span>
          <span> para o endereço </span>
          <span className={style.addressConfirm}>PAGAMENTO DE CONTA</span>
        </div>

        <div className={style.confirmFee}>
          <input
            type="password"
            name="txtpass"
            placeholder="*********"
            onChange={event => this.setPassword(event.target.value)}
            value={password}
            className={style.inputTextDefault}
          />
        </div>

        <button className={style.btContinue} onClick={() => handleStep("next")}>
          Confirmar
        </button>
      </div>
    );
  }
}

export default SecurePayment;