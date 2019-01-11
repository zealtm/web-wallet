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
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Itau.svg/1011px-Itau.svg.png"
            alt={i18n.t("BANK_ICON")}
          />
        </div>

        <p>{i18n.t("DEPOSIT_ACCOUNT_MODAL_CONTENT")}</p>
      </div>
    );
  }
}

export default BankModal;
