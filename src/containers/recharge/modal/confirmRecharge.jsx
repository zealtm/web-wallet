import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalStep } from "../redux/rechargeAction";

//COMPONENTS
import ButtonContinue from "../../../components/buttonContinue";
import Modal from "../../../components/modal";

// UTILS
import i18n from "../../../utils/i18n";
import { errorInput } from "../../errors/redux/errorAction";

// STYLES
import style from "./style.css";


class ConfirmRecharge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  handleModal= () => this.setState({isOpen: !this.state.isOpen});

  confirmPay = () => {
    const { setModalStep, coins, recharge, errorInput,selectMethodId } = this.props;

    const coinBalance = coins[recharge.coin.abbreviation].balance.available;
    const amount = recharge.amount + recharge.fee.fee.fee;

    if (coinBalance > parseFloat(amount)) {
      if(selectMethodId===1) 
        this.handleModal(); 
      else
        setModalStep(4);
    } else {
      errorInput(i18n.t("RECHARGE_AMOUNT_ERROR"));
      return;
    }
  }
  handleConfirmCredit = ()=>{
    setModalStep(4);
  };
  renderConfirm = ()=>{
    return (
      <div className={style.modalBox}>
        <div>{i18n.t("RECHARGE_ALERT_CONFIRM_CREDIT")}</div>
        <button
                className={style.btContinue}
                onClick={() => this.handleConfirmCredit()}
        >
        {i18n.t("PAYMENT_BTN_PAY")}
        </button>
        <button
                className={style.btCancel}
                onClick={() => this.handleModal()}
        >
        {i18n.t("BT_CENCEL_CONFIRM")}
        </button>
      </div>
    );
  };

  render() {
    const { loading, recharge } = this.props;
    return (
      <div className={style.modalBox}>
        <div>{i18n.t("RECHARGE_CONFIRM_1")}</div>
        <div>
          <span>{i18n.t("RECHARGE_CONFIRM_2")}</span>
          <span className={style.totalConfirmBlock}>{recharge.amount + recharge.fee.fee.fee} {recharge.coin.abbreviation.toUpperCase()}</span>
        </div>

        <div className={style.smallDescription}>
          {i18n.t("RECHARGE_CONFIRM_3")}
        </div>

        <ButtonContinue
          label={i18n.t("PAYMENT_BTN_PAY")}
          action={() => this.confirmPay()}
          loading={loading}
        />
        <Modal
          title={"Instructions"}
          content={this.renderConfirm()}
          show={isOpen}
          close={() => this.handleModal()}
        />
      </div>
    );
  }
}

ConfirmRecharge.propTypes = {
  setModalStep: PropTypes.func.isRequired,
  recharge: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  coins: PropTypes.array.isRequired,
  errorInput: PropTypes.func.isRequired,
  selectMethodId: PropTypes.number
}

const mapStateToProps = store => ({
  recharge: store.recharge.recharge,
  loading: store.recharge.loading,
  coins: store.skeleton.coins,
  selectMethodId: store.deposit.selectMethodId
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { setModalStep, errorInput },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmRecharge);
