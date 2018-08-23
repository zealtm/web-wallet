import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setWalletModalStep } from "../../redux/walletAction";
import { errorInput } from "../../../errors/redux/errorAction";

// COMPONENTS
import Loading from "../../../../components/loading";

// STYLE
import style from "../../style.css";

class BoxProcess extends React.Component {
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
            {modal.sendAmount + " " + coin.toUpperCase()}
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
  coin: PropTypes.string.isRequired,
  modal: PropTypes.object.isRequired,
  errorInput: PropTypes.func.isRequired,
  setWalletModalStep: PropTypes.func.isRequired
};

const mapSateToProps = store => ({
  modal: store.wallet.modal
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setWalletModalStep,
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(BoxProcess);
