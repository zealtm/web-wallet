import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalStep } from "../../../p2p/redux/p2pAction";

// STYLE
import style from "./style.css";

class ConfirmModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
      selectFee: false
    };
  }

  calcFee = () => {
    this.setState({ selectFee: true });
  };

  hendlerContinue = () => {
    const { setModalStep } = this.props;
    setModalStep(2);
  };

  render() {
    return (
      <div className={style.modalBox}>
        <img
          src={"/images/icons/coins/lunes.png"}
          className={style.modalIconCoin}
        />
        <div>
          <span>{i18n.t("P2P_TEXT_10")}</span>
          <span className={style.totalConfirm}>{"542.59359739 LUNES"}</span>
          <br />
          <span>{i18n.t("P2P_TEXT_11")}</span>
        </div>

        <div className={style.confirmFee}>
          <div>{i18n.t("P2P_TEXT_12")}</div>
          <div className={style.txtamount}>{"0"}</div>
        </div>

        <div className={style.boxFee}>
          <span className={style.greenLabelFee} onClick={() => this.calcFee()}>
            {"Low 0.001"}
          </span>
          <span className={style.yellowLabelFee} onClick={() => this.calcFee()}>
            {"Medium 0.001"}
          </span>
          <span className={style.redLabelFee} onClick={() => this.calcFee()}>
            {"High 0.001"}
          </span>
        </div>
        <button
          className={style.btGreen}
          onClick={() => this.hendlerContinue()}
        >
          {i18n.t("P2P_BUTTON_CONFIRM")}
        </button>
      </div>
    );
  }
}

ConfirmModal.propTypes = {
  setModalStep: PropTypes.func.isRequired
};

const mapStateToProps = store => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setModalStep
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmModal);
