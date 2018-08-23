import React from "react";
import BoxQrReader from "./boxQrReader";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getValidateAddress,
  setWalletSendModalLoading
} from "../../redux/walletAction";
import { errorInput } from "../../../errors/redux/errorAction";

// MATERIAL UI
import Hidden from "@material-ui/core/Hidden";

// COMPONENTS
import ButtonContinue from "./buttonContinue.jsx";

// STYLE
import style from "../../style.css";

class BoxAddress extends React.Component {
  constructor() {
    super();
    this.state = { address: "", isVisible: false };
  }

  changeAddress = address => this.setState({ address });

  showQrCodeReader = () => {
    let { isVisible } = this.state;
    this.setState({ isVisible: !isVisible });
  };

  validateAddress = () => {
    let { address } = this.state;
    let { coin, getValidateAddress, setWalletSendModalLoading } = this.props;

    setWalletSendModalLoading();
    getValidateAddress(coin, address);

    return;
  };

  handleQrCodeReader = () => {
    let { isVisible, address } = this.state;
    let { coin, modal } = this.props;

    if (isVisible) {
      return (
        <div className={style.boxQr}>
          <div />
          <div className={style.qrCode}>
            <BoxQrReader coin={coin} />
          </div>
          <div />
        </div>
      );
    }

    return (
      <div>
        <Hidden lgUp>
          <div className={style.boxQr} onClick={() => this.showQrCodeReader()}>
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

        <div className={style.modalBox}>
          <div className={style.boxDecription}>
            <img
              src="/images/icons/modal-wallet/carteira.png"
              className={style.icon}
            />
            <div>Inserir endereço da Wallet {coin.toUpperCase()}</div>
          </div>

          <input
            type="text"
            name="txtaddress"
            value={address}
            onChange={event => this.changeAddress(event.target.value)}
            placeholder="Ex: 37n724hxf4XnCFfJFnCzj4TbYryoizdfGCV"
            className={style.inputClear}
          />
        </div>

        <ButtonContinue
          action={() => this.validateAddress()}
          loading={modal.loading}
        />
      </div>
    );
  };

  render() {
    return <div>{this.handleQrCodeReader()}</div>;
  }
}

BoxAddress.propTypes = {
  coin: PropTypes.string.isRequired,
  modal: PropTypes.object.isRequired,
  errorInput: PropTypes.func.isRequired,
  getValidateAddress: PropTypes.func.isRequired,
  setWalletSendModalLoading: PropTypes.func.isRequired
};

const mapSateToProps = store => ({
  modal: store.wallet.modal
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setWalletSendModalLoading,
      getValidateAddress,
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(BoxAddress);
