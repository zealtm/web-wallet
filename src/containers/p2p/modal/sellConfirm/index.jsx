import React from "react";

// UTILS
import i18n from "../../../../utils/i18n";

// STYLE
import style from "./style.css";

class SellConfirmModal extends React.Component {
  render() {
    return (
      <div className={style.containerSellConfirm}>
        <img
          src="/images/modal/sell-confirm.png"
          className={style.imgSellConfirm}
        />
        <div>
          <p className={style.textSellConfirm}> {i18n.t("P2P_TEXT_13")}</p>
        </div>
        <div className={style.boxBtnSellConfirm}>
          <button className={style.btnSellConfirm}>
            {" "}
            {i18n.t("P2P_BUTTON_CONFIRM_RECEIPT")}
          </button>
        </div>
      </div>
    );
  }
}

export default SellConfirmModal;
