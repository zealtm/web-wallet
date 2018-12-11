import React from "react";
import PropTypes from "prop-types";

// UTILS
import i18n from "../../../../utils/i18n";

// STYLE
import style from "./style.css";

//COMPONENTS

class SellConfirmModal extends React.Component {
  render() {
    return <div className={style.containerSellConfirm}>
        <img src="/images/modal/sell-confirm.png" className={style.imgSellConfirm} />
        <div>
          <p className={style.textSellConfirm}>
            Parabéns, você acaba de fazer uma venda. Assim que você se
            certificar que o depósito foi realizado, confirme que a
            transação foi um sucesso!
          </p>
        </div>
        <div className={style.boxBtnSellConfirm}>
          <button className={style.btnSellConfirm}>
            Confirmar Recebimento
          </button>
        </div>
      </div>;
  }
}

SellConfirmModal.propTypes = {};

export default SellConfirmModal;
