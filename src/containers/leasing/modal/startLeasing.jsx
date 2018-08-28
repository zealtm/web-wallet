import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import CustomSelect from "./customSelect";
import i18n from "../../../utils/i18n";
import style from "../style.css";


class StartLeasing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amountValue: 0
    }
  }

  handleAmountValue = (value) => {
    this.setState({ amountValue: value });
  }


  render() {
    let { amountValue } = this.state;
    let { coins } = this.props;
    let balance = coins.lunes.balance.available
    return <div className={style.baseStep} style={{ textAlign: "right", alignSelf: "flex-end", padding: 16, color: "#fff" }}>
      <div className={style.boxLine}>
        <div>{i18n.t("LEASING_BALANCE")}</div>
        <div style={{ fontSize: "26px" }}>{balance}</div>
      </div>

      <div className={style.boxLine}>
        <div>{i18n.t("LEASING_AMOUNT_LABEL")}</div>
        <input
          className={style.txtamount}
          type="text"
          name="txtamount"
          placeholder="0"
          onChange={event => this.handleAmountValue(event.target.value)}
          value={amountValue}
        />
      </div>

      <div className={style.boxFee}>
        <span className={style.greenLabelFee} >
          25%
        </span>
        <span className={style.greenLabelFee} >
          50%
        </span>
        <span className={style.yellowLabelFee} >
          75%
        </span>
        <span className={style.redLabelFee} >
          100%
        </span>
      </div>

      <CustomSelect action={() => alert("teste")} />

      <input
        type="text"
        name="txtaddress"
        placeholder="Ex: 37n724hxf4XnCFfJFnCzj4TbYryoizdfGCV"
        className={style.inputClear}
      />

      <div className={style.titleFee}>{i18n.t("LEASING_FEE")}</div>
      <div className={style.feeVal}>0.00000000</div>

      <div className={style.labelHelp}>{i18n.t("LEASING_HELP_TEXT")}</div>
      <button className={style.btContinue} onClick={() => alert("teste")}>{i18n.t("LEASING_BT_START")}</button>

    </div>;
  }
}

StartLeasing.propTypes = {
  coins: PropTypes.array.isRequired
}

const mapSateToProps = store => ({
  coins: store.skeleton.coins
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(StartLeasing);