import React, { Component } from "react";

//UTILS
import i18n from "../../../../utils/i18n";

//STYLE
import style from "./style.css";

class BankModal extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className={style.modalBox}>
        <strong>{i18n.t("DEPOSIT_ACCOUNT_MODAL_HEADER")}</strong>
        <div>
          <img
            src="images/icons/deposit/itau-icon.png"
            alt={i18n.t("BANK_ICON")}
          />
        </div>

        <p>{i18n.t("DEPOSIT_ACCOUNT_MODAL_CONTENT")}</p>
      </div>
    );
  }
}

export default BankModal;
