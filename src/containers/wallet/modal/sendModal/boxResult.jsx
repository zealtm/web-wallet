import React from "react";

// STYLE
import style from "../../style.css";

class BoxResult extends React.Component {
  render() {
    return (
      <div className={style.modalBox}>
        <img src="/images/icons/confirm/confirm.png" />
        <div>
          <span className={style.totalConfirm}>
            O envio foi feito com sucesso
          </span>
        </div>
      </div>
    );
  }
}

export default BoxResult;
