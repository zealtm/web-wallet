import React from "react";
import CustomSelect from "./customSelect";
import PropTypes from "prop-types";
import i18n from "../../../utils/i18n";
import style from "../style.css";

class StartLeasing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amountValue: "5.000.00",
      address: "",
    }
  }

  handleAmountValue = (value) => {
    this.setState({ amountValue: value });
  }

  handleAddress = (value) => {
    this.setState({ address: value });
  }
  render() {
    let { amountValue, address } = this.state;
    let { professionalNode } = this.props;
    return <div className={style.baseStep} style={{ textAlign: "right", alignSelf: "flex-end", padding: 16, color: "#fff" }}>
      <div className={style.boxLine}>
        <div>{i18n.t("LEASING_BALANCE")}</div>
        <div style={{ fontSize: "26px" }}>142,5 milhões de Lunes</div>
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

      <CustomSelect nodes={professionalNode} handleAddress={this.handleAddress} />

      <input
        type="text"
        name="txtaddress"
        placeholder="Ex: 37n724hxf4XnCFfJFnCzj4TbYryoizdfGCV"
        onChange={(event) => this.handleAddress(event.target.value)}
        value={address}
        className={style.inputClear}
      />

      <div className={style.titleFee}>{i18n.t("LEASING_FEE")}</div>
      <div className={style.feeVal}>0.00000000</div>

      <div className={style.labelHelp}>{i18n.t("LEASING_HELP_TEXT")}</div>
      <button className={style.btContinue} >{i18n.t("LEASING_BT_START")}</button>

    </div>;
  }
}

StartLeasing.propTypes = {
  professionalNode: PropTypes.array,
};


export default (StartLeasing);

