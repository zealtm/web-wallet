import React from "react";

// UTILS
import i18n from "../../utils/i18n";

// STYLE
import style from "./style.css";

class Wallet extends React.Component {
  render() {
    return <div>
      Wallet
      <div>
        <button className={style.receiveSubmit}>  {i18n.t("BTN_RECEIVE")} </button>
        <button className={style.receiveButton}>  {i18n.t("BTN_SUBMIT")} </button>
      </div>

    </div>;
  }
}

export default Wallet;
