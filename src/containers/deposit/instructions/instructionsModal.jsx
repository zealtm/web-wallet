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
          <strong>{"depósito"}</strong>
        </div>
        <ol>
          <li>
            <span> {"R$4,20 para depósito com boleto"}</span>
          </li>
          <li>
            <span> {"2,75% para depósito com débito"}</span>
          </li>
        </ol>
        <div className={style.infoModal}>
          <strong>{"serviços"}</strong>
        </div>
        <ol>
          <li>
            <span> {"recarga - 0%"}</span>
          </li>
          <li>
            <span> {"boleto - 1%"}</span>
          </li>
          <li>
            <span> {"compra - 5%"}</span>
          </li>
        </ol>        
      </div>
    );
  }
}

export default InstructionsModal;
