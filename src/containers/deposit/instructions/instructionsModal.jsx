import React from "react";

// STYLE
import style from "./style.css";

// UTILS
import i18n from "../../../utils/i18n";

class InstructionsModal extends React.Component {
  render() {
    return (
      <div className={style.alignInstructions}>
        
        <div className={style.infoModal}>
          <strong>{i18n.t("DEPOSIT_INFO_FEE")}</strong>
        </div>
        <ol>
          <li>
            <span> {i18n.t("DEPOSIT_INFO_FEE_BOLETO")}</span>
          </li>
          <li>
            <span> {i18n.t("DEPOSIT_INFO_FEE_DEBIT")}</span>
          </li>
        </ol>
        <div className={style.infoModal}>
          <strong>{i18n.t("DEPOSIT_INFO_SERVICE_FEE")}</strong>
        </div>
        <ol>
          <li>
            <span> {i18n.t("DEPOSIT_INFO_RECHARGE_FEE")}</span>
          </li>
          <li>
            <span> {i18n.t("DEPOSIT_INFO_PAYMENT_FEE")}</span>
          </li>
          <li>
            <span> {i18n.t("DEPOSIT_INFO_BUY_FEE")}</span>
          </li>
        </ol>
        <div className={style.infoModal}>
          <strong>
            {i18n.t("DEPOSIT_INFO_USER")} <br /><br />
            {i18n.t("DEPOSIT_INFO_CASHBACK")}
          </strong>
        </div>       
      </div>
    );
  }
}

export default InstructionsModal;
