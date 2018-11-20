import React from "react";
import PropTypes from "prop-types";

import style from "./style.css";

class DepositModal extends React.Component {
  render(){
    return <div className={style.depositContainer}>
        <div className={style.textDeposit}>
          {i18n.t("P2P_TEXT_4")}
        </div>
        <img src="/images/modal/Group 323.png" className={style.imgQrCodeDeposit} />
        <div className={style.inputCopyBtnDeposit}>
          <input className={style.inputDeposit}></input>
          <button className={style.copyCodeDeposit}>{i18n.t("P2P_TEXT_5")}</button>
          <button className={style.btnDeposit}>{i18n.t("P2P_TEXT_6")}</button>
        </div>
      </div>;
  }
}

DepositModal.propTypes = {
  
}

export default DepositModal;