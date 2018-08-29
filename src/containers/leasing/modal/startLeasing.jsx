import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import CustomSelect from "./customSelect";
import i18n from "../../../utils/i18n";
import style from "../style.css";
import { getValidateAddress, } from "../../wallet/redux/walletAction";
import { errorInput } from "../../errors/redux/errorAction";

class StartLeasing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amountValue: 0,
      address: ""
    }
  }

  handleAmountValue = (value) => {
    
    value = parseFloat(value);
    console.warn("handle ", value)
    this.setState({ amountValue: value });
  }

  handleAddressValue = (address) => {
    this.setState({ address });
  }

  percentageCalculation = (value) => {
    let { balance, decimalPoint } = this.props;

    let amount = parseFloat(balance);
    let result = (value / 100) * amount;
    console.warn(result);
    this.handleAmountValue(result.toFixed(decimalPoint));
  }

  handleStartLeasing = () => {
    let { getValidateAddress, coins, feeValue, balance, errorInput } = this.props;
    let { amountValue, address } = this.state;
    let isGreatherThenBalance = amountValue + feeValue.low <= balance;

    if (amountValue === 0) {
      errorInput(i18n.t("LEASING_NOT_INFORMED_FIELD"));
      return;
    }

    if (!isGreatherThenBalance) {
      errorInput(i18n.t("BALANCE_ERROR_AMOUNT"));
      return;
    }

    getValidateAddress(coins.lunes.abbreviation, address);

    console.warn("Leasing started!!!")
    return;
  }

  render() {
    let { amountValue, address } = this.state;
    let { balance, feeValue } = this.props;
    return <div className={style.baseStep} style={{ textAlign: "right", alignSelf: "flex-end", padding: 16, color: "#fff" }}>
      <div className={style.boxLine}>
        <div>{i18n.t("LEASING_BALANCE")}</div>
        <div style={{ fontSize: "26px" }}>{balance}</div>
      </div>

      <div className={style.boxLine}>
        <div>{i18n.t("LEASING_AMOUNT_LABEL")}</div>
        <input
          className={style.txtamount}
          type="number"
          name="txtamount"
          placeholder="0"
          onChange={event => this.handleAmountValue(event.target.value)}
          value={amountValue}
        />
      </div>

      <div className={style.boxFee}>
        <span
          className={style.greenLabelFee}
          onClick={() => this.percentageCalculation(25)}>
          25%
        </span>
        <span
          className={style.greenLabelFee}
          onClick={() => this.percentageCalculation(50)}>
          50%
        </span>
        <span
          className={style.yellowLabelFee}
          onClick={() => this.percentageCalculation(75)}>
          75%
        </span>
        <span
          className={style.redLabelFee}
          onClick={() => this.percentageCalculation(100)}>
          100%
        </span>
      </div>

      <CustomSelect action={() => alert("")} />

      <input
        type="text"
        name="txtaddress"
        placeholder="Ex: 37n724hxf4XnCFfJFnCzj4TbYryoizdfGCV"
        className={style.inputClear}
        onChange={event => this.handleAddressValue(event.target.value)}
        value={address}
      />

      <div className={style.titleFee}>{i18n.t("LEASING_FEE")}</div>
      <div className={style.feeVal}>{feeValue.low}</div>

      <div className={style.labelHelp}>{i18n.t("LEASING_HELP_TEXT")}</div>
      <button
        className={style.btContinue}
        onClick={() => this.handleStartLeasing()}>
        {i18n.t("LEASING_BT_START")}
      </button>

    </div>;
  }
}

StartLeasing.propTypes = {
  coins: PropTypes.array.isRequired,
  feeValue: PropTypes.object,
  balance: PropTypes.number,
  decimalPoint: PropTypes.number,
  getValidateAddress: PropTypes.func,
  getCoinFeeValue: PropTypes.func,
  errorInput: PropTypes.func

}

const mapSateToProps = store => ({
  coins: store.skeleton.coins,
  feeValue: store.wallet.coinFee,
  balance: store.skeleton.coins.lunes.balance.available,
  decimalPoint: store.skeleton.coins.lunes.decimalPoint
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getValidateAddress,
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(StartLeasing);