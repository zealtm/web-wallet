import React, { Component } from "react";
import style from "./style.css";
import i18n from "../../../../utils/i18n";
import { Grid, Hidden } from "@material-ui/core";

class PayModal extends Component {
  render() {
    return (
      <Grid item xs={12} sm={12} container className={style.containerPayModal}>
        <Grid item xs={12} sm={12}>
          <img
            className={style.payModalImg}
            src="images/icons/deposit/confirm-ticket.png"
            alt={i18n.t("DEPOSIT_TAB_TITLE")}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <p className={style.payModalText} style={{ marginBottom: 40 }}>
            {i18n.t("DEPOSIT_PAYMODAL_TEXT")}
          </p>
        </Grid>

        <Grid item xs={12} sm={12} className={style.payModalField}>
          <span>1232154646465465000000213210013</span>
        </Grid>

        <Grid item xs={12} sm={12}>
          <span className={style.payModalTitle}>
            {i18n.t("DEPOSIT_PAYMODAL_TITLE")}
          </span>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          className={style.payModalBoxImgIcon}
          style={{ marginTop: 25 }}
        >
          <Grid>
            <a href="#">
              <img
                src="/images/icons/deposit/paymodal_copy@1x.png"
                className={style.payModalIconsCopy}
              />
              <p className={style.payModalTextIcon}>
                {i18n.t("DEPOSIT_PAYMODAL_COPY")}
              </p>
            </a>
          </Grid>

          <Grid className={style.payModalIconsBoxDownload}>
            <a href="#">
              <img
                src="/images/icons/deposit/paymodal_download@1x.png"
                className={style.payModalIconsDownload}
              />
              <p className={style.payModalTextIcon}>
                {i18n.t("DEPOSIT_PAYMODAL_DOWNLOAD")}
              </p>
            </a>
          </Grid>

          <Hidden smUp>
            <Grid>
              <a href="#">
                <img
                  src="/images/icons/deposit/paymodal_share@1x.png"
                  className={style.payModalIconsShare}
                />
                <p className={style.payModalTextIcon}>
                  {i18n.t("DEPOSIT_PAYMODAL_SHARE")}
                </p>
              </a>
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
    );
  }
}

export default PayModal;
