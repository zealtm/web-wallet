import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setAddressModalStep } from "../../redux/assetsAction";

// COMPONENTS
import Loading from "../../../../components/loading";

// STYLE
import style from "../../style.css";

// UTILS
import i18n from "../../../../utils/i18n";

class BoxProcess extends React.Component {
  doTransaction = () => {
    const { setAddressModalStep } = this.props;
    setAddressModalStep(5);
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
          <span>{i18n.t("MODAL_SEND_TO_SEND")} </span>
          <span className={style.totalConfirm}>
            {modal.finalAmount + " " + coin.toUpperCase()}
          </span>
          <span> {i18n.t("MODAL_SEND_TO_ADDRESS")} </span>
          <span className={style.addressConfirm}>{modal.address}</span>
        </div>
        <Loading width={"30px"} />
        <div className={style.confirmFee}>
          <div className={style.textHelp}>
            {i18n.t("MODAL_SEND_INFO_BLOCKCHAIN")} {coin.toUpperCase()}
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
  setAddressModalStep: PropTypes.func.isRequired
};

const mapSateToProps = store => ({
  user: store.user.user,
  modal: store.wallet.modal,
  coins: store.skeleton.coins
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setAddressModalStep
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(BoxProcess);
