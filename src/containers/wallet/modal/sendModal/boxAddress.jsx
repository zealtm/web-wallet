import React from "react";
import BoxQrReader from "./boxQrReader";

// MATERIAL UI
import Hidden from "@material-ui/core/Hidden";

// STYLE
import style from "../../style.css";

class BoxAddress extends React.Component {
  constructor() {
    super();
    this.state = {
      address: "",
      isVisible: false
    };
  }

  changeAddress(address) {
    this.setState({
      address
    });
  }

  handleVisibilityQrCode = () => {
    this.setState({
      isVisible: !this.state.isVisible
    });
    
  }
  render() {
    let { address } = this.state;

    return (
      <div>
        <Hidden lgUp>
          <div className={style.boxQr} onClick={() => alert("teste")}>
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
        </Hidden>

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
            value={address}
            onChange={(event) => this.changeAddress(event.target.value)}
            placeholder="Ex: 37n724hxf4XnCFfJFnCzj4TbYryoizdfGCV"
            className={style.inputClear}
          />
        </div>
      </div>
    );
  }
}

export default BoxAddress;
