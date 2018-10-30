import React from "react";
import PropTypes from "prop-types";

import style from "./style.css";

class DepositModal extends React.Component {
  render(){
    return <div className={style.depositContainer}>
        <div className={style.textDeposit}>
          Utilize o QR CODE ou endereço da carteira abaixo para realizar o deposito
        </div>
        <img src="/images/modal/Group 323.png" className={style.imgQrCodeDeposit} />
        <div className={style.inputCopyBtnDeposit}>
          <input className={style.inputDeposit}></input>
          <button className={style.copyCodeDeposit}>Copiar Código</button>
          <button className={style.btnDeposit}>Concluir</button>
        </div>
      </div>;
  }
}

DepositModal.propTypes = {
  
}

export default DepositModal;