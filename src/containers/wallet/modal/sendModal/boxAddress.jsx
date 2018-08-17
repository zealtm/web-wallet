import React from "react";

// STYLE
import style from "./style.css";

class BoxAddress extends React.Component {
  render() {
    return (
      <div>
        <div className={style.boxQr}>
          <div className={style.boxDecription}>
            <img
              src="/images/icons/qrcode/qrcode.png"
              className={style.hoverShow}
            />
            <div>Enviar Scaneando QrCode</div>
          </div>

          <div className={style.textHelp}>
            Para esse procedimento em deskop você precisa usar uma webcam para
            <br />
            visualizar o qrcode que deseja enviar.
          </div>
        </div>

        <div className={style.box}>
          <div className={style.boxDecription}>
            <img
              src="/images/icons/modal-wallet/carteira.png"
              className={style.icon}
            />
            <div>Inserir endereço da Wallet Lunes</div>
          </div>

          <input
            type="text"
            name="txtaddress"
            value="asdasdasdasdasdasdasd"
            placeholder="37n724hxf4XnCFfJFnCzj4TbYryoizdfGCV"
            className={style.inputClear}
          />
        </div>
      </div>
    );
  }
}

export default BoxAddress;
