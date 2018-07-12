import React from "react";
import i18n from "../../utils/i18n";

// STYLE
import style from "./style.css";

class PIN extends React.Component {  
    render() {  
      return (
        <div className={style.formPIN}>
          <img src="../../images/logo.svg" className={style.logo} />
          <div className={style.descriptionPIN}>{i18n.t("PIN_HEADER")}</div>
  
          <input type="password" className={style.inputPINDefault} maxLength="1"/>
          <input type="password" className={style.inputPINDefault} maxLength="1"/>
          <input type="password" className={style.inputPINDefault} maxLength="1"/>
          <input type="password" className={style.inputPINDefault} maxLength="1"/>  

          <div className={style.descriptionLink}>{i18n.t("PIN_FORGET_PIN_LINK")}</div>

          <button className={style.buttonBorderGreen}>
          {i18n.t("BTN_LOGIN")}
        </button>
        
        </div>
      );
    }
}

export default PIN;
