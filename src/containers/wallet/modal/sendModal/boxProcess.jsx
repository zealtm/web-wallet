import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setWalletTransaction } from "../../redux/walletAction";

// COMPONENTS
import Loading from "../../../../components/loading";

// STYLE
import style from "../../style.css";

class BoxProcess extends React.Component {
  doTransaction = () => {
    console.warn(modal);
    let { coin, user, modal, coins, setWalletTransaction } = this.props;
    setWalletTransaction(
      {
        coin: coin,
        fromAddress: coins[coin].address,
        toAddress: modal.address,
        amount: modal.sendAmount,
        fee: modal.feeValue.selectedFee,
        feePerByte: modal.feeValue.selectedFeePerByte,
        decimalPoint: coins[coin].decimalPoint
      },
      user.password
    );

    return;
  };

  componentDidMount() {
    this.doTransaction();
    return;
  }

  render() {
    let { coin, modal } = this.props;

    return (
      <div className={style.modalBox}>
        <img
          src={"/images/icons/coins/" + coin + ".png"}
          className={style.modalIconCoin}
        />
        <div className={style.processInfo}>
          <span>Voce esta enviando </span>
          <span className={style.totalConfirm}>
            {modal.finalAmount + " " + coin.toUpperCase()}
          </span>
          <span> para o endereco </span>
          <span className={style.addressConfirm}>{modal.address}</span>
        </div>
        <Loading width={"30px"} />
        <div className={style.confirmFee}>
          <div className={style.textHelp}>
            Sua transação esta sendo processada dentro do Blockchain{" "}
            {coin.toUpperCase()}
          </div>
        </div>
      </div>
    );
  }
}

BoxProcess.propTypes = {
  user: PropTypes.object.isRequired,
  coin: PropTypes.string.isRequired,
  coins: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  modal: PropTypes.object.isRequired,
  setWalletTransaction: PropTypes.func.isRequired
};

const mapSateToProps = store => ({
  user: store.user.user,
  modal: store.wallet.modal,
  coins: store.skeleton.coins
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setWalletTransaction
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(BoxProcess);
