import React from "react";

import style from "./style.css";

import i18n from "../../../utils/i18n";

class Cancel extends React.Component {
  render() {
    return (
      <div className={style.depositCancelContainer}>
        <div>
          <img
            src="images/icons/deposit/cancel-deposit.png"
            className={style.depositCancelImg}
            alt={i18n.t("DEPOSIT_TAB_TITLE")}
          />
          <div>
            <p className={style.depositCancelText}>{i18n.t("DEPOSIT_TEXT_CANCEL")}</p>
            <span className={style.depositNumCancel}>R$ 1000,00</span>
          </div>
        </div>
        <div>
          <button className={style.depositBtnCancel}>
            {i18n.t("DEPOSIT_BTN_CANCEL")}
          </button>
        </div>
      </div>
    );
  }
}

export default Cancel;
