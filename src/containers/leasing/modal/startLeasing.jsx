import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// COMPONENTS INTERNOS
import CustomSelect from "./customSelect";

// UTILS 
import i18n from "../../../utils/i18n";

// STYLE
import style from "../style.css";

class StartLeasing extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className={style.baseStep} style={{textAlign:"right", alignSelf:"flex-end", padding:16, color:"#fff"}}>
      <div className={style.boxLine}>
        <div>{i18n.t("LEASING_BALANCE")}</div>
        <div style={{fontSize:"26px"}}>158 mil LUNES</div>
      </div>

      <div className={style.boxLine}>
        <div>{i18n.t("LEASING_AMOUNT_LABEL")}</div>
        <input
          className={style.txtamount}
          type="text"
          name="txtamount"
          placeholder="0"
          value={5000}
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

      <CustomSelect action={()=> alert("teste")} />
      
      <input
        type="text"
        name="txtaddress"
        placeholder="Ex: 37n724hxf4XnCFfJFnCzj4TbYryoizdfGCV"
        className={style.inputClear}
      />

      <div className={style.titleFee}>{i18n.t("LEASING_FEE")}</div>
      <div className={style.feeVal}>0.00000000</div>

      <div className={style.labelHelp}>{i18n.t("LEASING_HELP_TEXT")}</div>
      <button className={style.btContinue} >{i18n.t("LEASING_BT_START")}</button>
      
    </div>;
  }
}

export default StartLeasing;
