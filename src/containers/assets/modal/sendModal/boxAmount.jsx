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

class BoxAmount extends React.Component {
  constructor() {
    super();
    this.state = {
      amount: ""
    };
  }

  setAmount = amount => {

  };

  calcPercent = value => {
    
  };

  confirmAmount = () => {
    let {
      setAssetModalStep,
    } = this.props;
    setAssetModalStep(2)
  };

  render() {
    let { amount } = this.state;
    let { modal } = this.props;
    let { asset: assetsRoute } = this.props;
    let { assets, selectedCoin } = assetsRoute;
    let token = assets[selectedCoin];

    return (
      <div className={style.modalBox}>
        <img
          src={token.image}
          className={style.modalIconCoin}
        />
        <div>{i18n.t("MODAL_SEND_AMOUNT")}</div>
        <input
          className={style.txtamount}
          type="text"
          name="txtamount"
          placeholder="0"
          value={amount}
          onChange={event => this.setAmount(event.target.value)}
        />

        <div className={style.boxPercent}>
          <span onClick={() => this.calcPercent(25)}>25%</span>
          <span onClick={() => this.calcPercent(50)}>50%</span>
          <span onClick={() => this.calcPercent(75)}>75%</span>
          <span onClick={() => this.calcPercent(100)}>Max</span>
        </div>

        <div className={style.textHelp}>
          {i18n.t("MODAL_SEND_AMOUNT_INSTRUCTIONS")}
        </div>

        <span className={style.addressConfirm}>{modal.address}</span>

        <div className={style.paddingTop8}>
          <ButtonContinue
            action={() => this.confirmAmount()}
            loading={modal.loading}
          />
        </div>
      </div>
    );
  }
}

BoxAmount.propTypes = {
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
)(BoxAmount);
