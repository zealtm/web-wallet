import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setAssetModalStep
} from "../../redux/assetsAction";
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

  calcFee = type => {
    return;
  };

  confirmFee = () => {
    
      setAssetModalStep(3);

      return;
   
  };

  render() {
    let {  modal } = this.props;
    let selectedFee = modal.feeValue.selectedFee
      ? modal.feeValue.selectedFee
      : 0;
    let amount = (modal.sendAmount + selectedFee).toFixed(8);
    let { asset: assetsRoute } = this.props;
    let { assets, selectedCoin } = assetsRoute;
    let token = assets[selectedCoin];
    return (
      <div className={style.modalBox}>
        <img
          src={assets.image}
          className={style.modalIconCoin}
        />
        <div>
          <span>{i18n.t("MODAL_SEND_TO_SEND")}</span>
          <span className={style.totalConfirm}>
            {" " + amount + " " + token.tokenName.toUpperCase()}
          </span>
        </div>
        <div>
          <span>{i18n.t("MODAL_SEND_TO_ADDRESS")}{' '}</span>
          <span className={style.addressConfirm}>{modal.address}</span>
        </div>

        <div className={style.confirmFee}>
          <div>
            {i18n.t("MODAL_SEND_FEE_TRANSACTION")}
            <span> {token.tokenName.toUpperCase()} </span>
            {i18n.t("TEXT_IS")}
          </div>
          <div className={style.txtamount}>{selectedFee}</div>
        </div>

        <div className={style.boxFee}>
          <span
            className={style.greenLabelFee}
            onClick={() => this.calcFee("low")}
          >
            {i18n.t("TEXT_LOW")} {modal.feeValue.fee.low || "-"}
          </span>
          <span
            className={style.yellowLabelFee}
            onClick={() => this.calcFee("medium")}
          >
            {i18n.t("TEXT_MEDIUM")} {modal.feeValue.fee.medium || "-"}
          </span>
          <span
            className={style.redLabelFee}
            onClick={() => this.calcFee("high")}
          >
            {i18n.t("TEXT_HIGH")} {modal.feeValue.fee.high || "-"}
          </span>
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
  modal: PropTypes.object.isRequired,
  asset: PropTypes.object.isRequired,
  errorInput: PropTypes.func.isRequired,
  setAssetModalStep: PropTypes.func.isRequired
};

const mapSateToProps = store => ({
  modal: store.asset.modal,
  asset: store.asset
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setAssetModalStep,
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(BoxFee);
