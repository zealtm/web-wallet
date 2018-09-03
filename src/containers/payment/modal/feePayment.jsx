import React from "react";
import PropTypes from "prop-types";

// UTILS
import i18n from "../../../utils/i18n";

// STYLES
import style from "./style.css";

class FeePayment extends React.Component {
  constructor(props) {
    super(props);
  }

  calcFee(type) {
    return null; // implemento o metodo de fee
  }

  render() {
    const { handleStep } = this.props;
    return (
      <div className={style.modalBox}>
        <img
          src={"/images/icons/coins/LUNES.png"}
          className={style.modalIconCoin}
        />
        <div>
          <span>Voce esta enviando </span>
          <span className={style.totalConfirm}>5000 LUNES</span>
        </div>
        <div>
          <span>para o endereco </span>
          <span className={style.addressConfirm}>PAGAMENTO DE CONTA</span>
        </div>

        <div className={style.confirmFee}>
          <div>
            Sua taxa de transação na rede <span> LUNES </span> é
          </div>
          <div className={style.txtamount}>0.001</div>
        </div>

        <div className={style.boxFee}>
          <span
            className={style.greenLabelFee}
            onClick={() => this.calcFee("low")}
          >
            Baixa 0.001
          </span>
          <span
            className={style.yellowLabelFee}
            onClick={() => this.calcFee("medium")}
          >
            Média 0.001
          </span>
          <span
            className={style.redLabelFee}
            onClick={() => this.calcFee("high")}
          >
            Alta 0.001
          </span>
        </div>

        <button className={style.btContinue} onClick={() => handleStep("next")}>
          Continuar
        </button>
      </div>
    );
  }
}

export default FeePayment;
