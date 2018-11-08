import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalStep } from "../../../redux/p2pAction";

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

    console.log("Acionou!");
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
          <span>{"You are sending "}</span>
          <span className={style.totalConfirm}>{"542.59359739 LUNES"}</span>
          <br />
          <span>{"for payment platform P2P "}</span>
        </div>

        <div className={style.confirmFee}>
          <div>{"Your transaction fee on the network LUNES is"}</div>
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
          {"Confirmar"}
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
