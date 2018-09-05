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
        <div>{i18n.t("PAYMENT_CONFIRM_1")}</div>
        <div>
          <span>{i18n.t("PAYMENT_CONFIRM_2")}</span>
          <span className={style.totalConfirmBlock}>5000 LUNES</span>
        </div>

        <div className={style.smallDescription}>
          {i18n.t("PAYMENT_CONFIRM_3")}
        </div>

        <button className={style.btContinue} onClick={() => handleStep("next")}>
          {i18n.t("PAYMENT_BTN_PAY")}
        </button>
      </div>
    );
  }
}

export default ConfirmPayment;
