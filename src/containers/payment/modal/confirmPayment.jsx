import React from "react";
import PropTypes from "prop-types";

// UTILS
import i18n from "../../../utils/i18n";

// STYLES
import style from "./style.css";

class ConfirmPayment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleStep } = this.props;
    return (
      <div className={style.modalBox}>
        <div>Confirme os dados para concluir seu pagamento</div>
        <div>
          <span>Será debitado da sua carteira </span>
          <span className={style.totalConfirmBlock}>5000 LUNES</span>
        </div>

        <div className={style.smallDescription}>
          O tempo médio de confirmação do pagamento é de até 30 minutos. Somente
          conclua o pagamento se estiver de acordo.
        </div>

        <button className={style.btContinue} onClick={() => handleStep("next")}>
          Pagar agora
        </button>
      </div>
    );
  }
}

export default ConfirmPayment;
