import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import style from "./style.css";
import i18n from "../../../../utils/i18n";
import { successRequest } from "../../../errors/redux/errorAction";
import { Grid, Hidden } from "@material-ui/core";
import Loading from "../../../../components/loading";
class PayModal extends Component {
  copyBarCode = () => {
    let { depositReturn, successRequest } = this.props;
    const element = document.createElement("textarea");
    element.value = depositReturn.barcode;
    document.body.appendChild(element);
    element.select();
    document.execCommand("copy");
    document.body.removeChild(element);
    successRequest(i18n.t("MODAL_RECEIVE_MESSAGE"));
  };
  render() {
    const { depositReturn, loading } = this.props;
    if (loading) return <Loading width={"30px"} />;
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
          <span>{depositReturn.barcode}</span>
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
            <div style={{ cursor: "pointer" }} onClick={() => this.copyBarCode()}>
              <img
                src="/images/icons/deposit/paymodal_copy@1x.png"
                className={style.payModalIconsCopy}
                alt={"copy"}
              />
              <p className={style.payModalTextIcon}>
                {i18n.t("DEPOSIT_PAYMODAL_COPY")}
              </p>
            </div>
          </Grid>

          <Grid className={style.payModalIconsBoxDownload}>
            <a href={depositReturn.pdf_url} target="_blank">
              <img
                src="/images/icons/deposit/paymodal_download@1x.png"
                className={style.payModalIconsDownload}
                alt={"download"}
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
                  alt={"share"}
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
PayModal.propTypes = {
  getDepositBill: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  loadingPdf: PropTypes.bool,
  depositReturn: PropTypes.object,
  buyID: PropTypes.number,
  successRequest: PropTypes.func
};
const mapStateToProps = store => ({
  loading: store.deposit.loading,
  loadingPdf: store.deposit.loadingPdf,
  depositReturn: store.deposit.depositReturn,
  buyID: store.deposit.buyID
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      successRequest
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PayModal);
