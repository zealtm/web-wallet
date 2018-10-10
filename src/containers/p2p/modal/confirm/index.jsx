import React from "react";
import PropTypes from "prop-types";

import style from "./style.css";

//MATERIAL

class ConfirmModal extends React.Component {
  render(){
    return (
      <div className={style.modelo}>
        <img src="" className={style.modelo} />
        <div className={style.modelo}>
          TEXTO COFNIRMACAO
        </div>
        <div className={style.modelo}>
          <button className={style.modelo}>Continuar</button>
        </div>
      </div>
    )
  }
}

ConfirmModal.propTypes = {
  
}

export default ConfirmModal;