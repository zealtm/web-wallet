import React from "react";

//import PropTypes from "prop-types";

import i18n from "../../../../utils/i18n";

import style from "./style.css";

import Grid from "@material-ui/core/Grid";


class documentConfirm extends React.Component {

  render() {
    return (
      <div>
        <Grid>
          <Grid container>
            <Grid sm={3} xs={3}>
              <img
                src="images/icons/security/kyc_documentConfirm.png"
                alt={i18n.t("KYC_DOCUMENTCONFIRM_IMG")}
              />
            </Grid>

            <Grid sm={6} xs={8} className={style.infoBoxText}>
              <h1 className={style.infoTitle}>{i18n.t("KYC_DOCUMENTCONFIRM_TITLE")}</h1>
              <Grid>
                <span className={style.infoText}>
                  {i18n.t("KYC_DOCUMENTCONFIRM_TEXT")}
                </span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default documentConfirm;
