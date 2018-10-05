import React from "react";
import PropTypes from "prop-types";

import style from "./style.css";

class InterestModal extends React.Component {
  render(){
    return (
      <div className={style.modelo}>
        <img src="" className={style.modelo} />
        <div className={style.modelo}>
          Um Player se interessou pela sua oferta e quer abrir um chat com você!
        </div>
        <div className={style.modelo}>
          <button className={style.modelo}>Conversar</button>
          <button className={style.modelo}>Agora não</button>
        </div>
      </div>
    )
  }
}

InterestModal.propTypes = {
  
}

export default InterestModal;