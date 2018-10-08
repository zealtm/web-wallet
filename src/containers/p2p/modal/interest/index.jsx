import React from "react";
import style from "./style.css";

class InterestModal extends React.Component {
  render(){
    return <div className={style.modalContainerChat}>
        <img src="/images/modal/chat@2x.png" className={style.modalImgChat} />
        <div className={style.openChat}>
        <p className={style.textOpenChat}>
            Um Player se interessou pela sua oferta e quer abrir um chat com
            você!
          </p>
        </div>
        <div className={style.btnChat}>
          <button className={style.btnTalkChat}>Conversar</button>
          <button className={style.btnNotTalkChat}>Agora não</button>
        </div>
      </div>
      
  }
}

InterestModal.propTypes = {
  
}

export default InterestModal;