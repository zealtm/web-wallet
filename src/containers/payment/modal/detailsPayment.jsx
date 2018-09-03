import React from "react";
import PropTypes from "prop-types";

// UTILS
import i18n from "../../../utils/i18n";

// STYLES
import style from "./style.css";

// MATERIAL
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";

// COMPONENTS
import CustomSwitch from "./component/customSwitch";

class DetailsPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleStep } = this.props;
    return (
      <div className={style.modalBox}>
        {i18n.t("PAYMENT_DETAILS_TEXT_1")}
        <div className={style.strongText} style={{ marginTop: 20 }}>
          <span className={style.textGreen}>1290 LUNES</span>
          {i18n.t("PAYMENT_DETAILS_TEXT_2")}
          <span className={style.textGreen}>R$ 30,00</span>
          {i18n.t("PAYMENT_DETAILS_TEXT_3")}
        </div>
        <Grid container className={style.inlineInfo}>
          <Grid item xs={6} md={3}>
            <label className={style.inlineInfoLabel}>{i18n.t("PAYMENT_TITLE_BANK")}</label>
            BANCO DO BRASIL
          </Grid>
          <Grid item xs={6} md={3}>
            <label className={style.inlineInfoLabel}>{i18n.t("PAYMENT_TITLE_NAME")}</label>
            NOME DO USUARIO COMPLETO
          </Grid>
          <Grid item xs={6} md={2}>
            <label className={style.inlineInfoLabel}>{i18n.t("PAYMENT_TITLE_DATE")}</label>
            10/10/2018
          </Grid>
          <Grid item xs={6} md={2}>
            <label className={style.inlineInfoLabel}>{i18n.t("PAYMENT_TITLE_DOC")}</label>
            12345678978
          </Grid>
          <Hidden smDown>
            <Grid item xs={6} md={2}>
              <label className={style.inlineInfoLabel}>{i18n.t("PAYMENT_TITLE_VALUE")}</label>
              R$30,00
            </Grid>
          </Hidden>
        </Grid>
        <CustomSwitch
          title={i18n.t("GDPR_TITLE")}
          description={i18n.t("GDPR_DESC")}
          action={() => alert("teste")}
          checked={this.state["check1"]}
        />
        <button
          className={style.btContinue}
          onClick={() => handleStep("next")}
          style={{ marginTop: 30, marginBottom: 30 }}
        >
          {i18n.t("BTN_CONFIRM")}
        </button>
      </div>
    );
  }
}

export default DetailsPayment;
