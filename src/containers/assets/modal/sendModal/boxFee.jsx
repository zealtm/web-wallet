import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalAssets } from "../../redux/assetsAction";
import { errorInput } from "../../../errors/redux/errorAction";

// COMPONENTS
import ButtonContinue from "./buttonContinue.jsx";

// UTILS
import i18n from "../../../../utils/i18n";

// STYLE
import style from "../../style.css";

class BoxFee extends React.Component {
  constructor() {
    super();
    this.state = {
      error: 0
    };
  }

  confirmFee = () => {
    const { setModalAssets } = this.props;
    setModalAssets(3);
  };

  render() {
    let { coin, modal } = this.props;

    return (
      <div className={style.modalBox}>
        <img
          src={"/images/icons/coins/" + coin + ".png"}
          className={style.modalIconCoin}
        />
        <div>
          <span>{i18n.t("MODAL_SEND_TO_SEND")}</span>
          <span className={style.totalConfirm} />
        </div>
        <div>
          <span>{i18n.t("MODAL_SEND_TO_ADDRESS")} </span>
        </div>

        <div className={style.confirmFee}>
          <div>
            {i18n.t("MODAL_SEND_FEE_TRANSACTION")}
            <span> {coin.toUpperCase()} </span>
            {i18n.t("TEXT_IS")}
          </div>
        </div>

        <div className={style.boxFee}>
          <span className={style.greenLabelFee} />
          <span className={style.yellowLabelFee} />
          <span className={style.redLabelFee} />
        </div>

        <div className={style.paddingTop8}>
          <ButtonContinue
            action={() => this.confirmFee()}
            loading={modal.loading}
          />
        </div>
      </div>
    );
  }
}

BoxFee.propTypes = {
  modal: PropTypes.number.isRequired,
  coin: PropTypes.string.isRequired,
  coins: PropTypes.array.isRequired,
  errorInput: PropTypes.func.isRequired,
  setModalAssets: PropTypes.func.isRequired
};

const mapSateToProps = store => ({
  modal: store.assets.modal,
  coins: store.skeleton.coins
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setModalAssets,
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(BoxFee);
