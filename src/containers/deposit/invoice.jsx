import React from "react";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";

// UTILS
import i18n from "../../utils/i18n";

// STYLE
import style from "./style.css";

class Invoice extends React.Component {
  render() {
    return (
      <Grid container direction="row" justify="center">
        <Grid item xs={12} className={style.transparentBox} style={{ marginTop: "10px" }}>
          <button className={style.buttonBorderGreen}>
            {i18n.t("DEPOSIT_TAB_TITLE")}
          </button>   
        </Grid>
        <Grid item xs={12} className={style.transparentBox} style={{marginTop: "10px"}}>
            <div className={style.information}>
                <a href="#">
                {i18n.t("COUPON_INSTRUCTIONS")}
                <img src="/images/icons/recharge/ic_instrucoes.png" alt= {i18n.t("COUPON_INSTRUCTIONS")}/>
                </a>
            </div>
        </Grid>
      </Grid>
    );
  }
}

Invoice.propTypes = {};

export default Invoice;
