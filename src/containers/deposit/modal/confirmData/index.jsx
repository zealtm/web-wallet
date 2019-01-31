import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalSteps, setLoading } from "../../redux/depositAction";
import PropTypes from "prop-types";
import i18n from "../../../../utils/i18n";
import style from "./style.css";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import ButtonContinue from "../../../../components/buttonContinue";

class ConfirmData extends React.Component {
  render() {
    const { setModalSteps } = this.props;

    return (
      <div>
        <Grid container className={style.containerConfirmData}>
          <Grid item xs={12} sm={7} style={{ marginBottom: 15 }}>
            <img
              src="images/icons/deposit/confirm-ticket.png"
              alt={i18n.t("DEPOSIT_TAB_TITLE")}
              className={style.ConfirmDataImg}
            />
            <span className={style.ConfirmDataBoxNum}>
              <span className={style.ConfirmDataDecimal}>
                {i18n.t("DEPOSIT_CONFIRMDATA_CIFRA")}
              </span>
              <span className={style.ConfirmDataNum}>
                {i18n.t("DEPOSIT_CONFIRMDATA_VALUE")}
              </span>
              <span className={style.ConfirmDataDecimal}>
                {i18n.t("DEPOSIT_CONFIRMDATA_DECIMAL")}
              </span>
            </span>
          </Grid>

          <Hidden xsDown>
            <Grid item sm={5}>
              <span className={style.ConfirmDataText}>
                {i18n.t("DEPOSIT_CONFIRMDATA_TEXT")}
              </span>
            </Grid>
          </Hidden>

          <Grid item xs={12} sm={6}>
            <div className={style.ConfirmDataDiv}>
              {i18n.t("DEPOSIT_CONFIRMDATA_NAME_TITLE")}
            </div>
            <span className={style.ConfirmDataField}>
              {i18n.t("DEPOSIT_CONFIRMDATA_NAME")}
            </span>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className={style.ConfirmDataDiv}>
              {i18n.t("DEPOSIT_CONFIRMDATA_CPF_TITLE")}
            </div>
            <span className={style.ConfirmDataField}>
              {i18n.t("DEPOSIT_CONFIRMDATA_CPF")}
            </span>
          </Grid>

          <Grid item xs={12} sm={4}>
            <div className={style.ConfirmDataDiv}>
              {i18n.t("DEPOSIT_CONFIRMDATA_STATE_TITLE")}
            </div>
            <span className={style.ConfirmDataField}>
              {i18n.t("DEPOSIT_CONFIRMDATA_STATE")}
            </span>
          </Grid>

          <Grid item xs={12} sm={4}>
            <div className={style.ConfirmDataDiv}>
              {i18n.t("DEPOSIT_CONFIRMDATA_CITY_TITLE")}
            </div>
            <span className={style.ConfirmDataField}>
              {i18n.t("DEPOSIT_CONFIRMDATA_CITY")}
            </span>
          </Grid>

          <Grid item xs={12} sm={4}>
            <div className={style.ConfirmDataDiv}>
              {i18n.t("DEPOSIT_CONFIRMDATA_CEP_TITLE")}
            </div>
            <span className={style.ConfirmDataField}>
              {i18n.t("DEPOSIT_CONFIRMDATA_CEP")}
            </span>
          </Grid>

          <Grid item xs={12} sm={8}>
            <div className={style.ConfirmDataDiv}>
              {i18n.t("DEPOSIT_CONFIRMDATA_ADDRESS_TITLE")}
            </div>
            <span className={style.ConfirmDataField}>
              {i18n.t("DEPOSIT_CONFIRMDATA_ADDRESS")}
            </span>
          </Grid>

          <Grid item xs={12} sm={4}>
            <div className={style.ConfirmDataDiv}>
              {i18n.t("DEPOSIT_CONFIRMDATA_NUMBER_TITLE")}
            </div>
            <span className={style.ConfirmDataField}>
              {i18n.t("DEPOSIT_CONFIRMDATA_NUMBER")}
            </span>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className={style.ConfirmDataDiv}>
              {i18n.t("DEPOSIT_CONFIRMDATA_RECURRENT_TITLE")}
            </div>
            <span className={style.ConfirmDataField}>
              {i18n.t("DEPOSIT_CONFIRMDATA_RECURRENT")}
            </span>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className={style.ConfirmDataDiv}>
              {i18n.t("DEPOSIT_CONFIRMDATA_SCHEDULING_TITLE")}
            </div>
            <span className={style.ConfirmDataField}>
              {i18n.t("DEPOSIT_CONFIRMDATA_SCHEDULING")}
            </span>
          </Grid>

          <Grid item xs={12} style={{ }}>
            <ButtonContinue
              label={i18n.t("DEPOSIT_CONFIRMDATA_BTN_CONFIRM")}
              action={() => setModalSteps(3)}
            />
          </Grid>

          <Hidden smUp>
            <Grid item xs={12} style={{ marginTop: 20, marginBottom: 20 }}>
              <a href="#">
                <span className={style.ConfirmDataInformation}>
                  {i18n.t("DEPOSIT_CONFIRMDATA_INFORMATION")}
                </span>
                <img
                  src="images/icons/deposit/confirm-information.png"
                  className={style.ConfirmDataInformationImg}
                  alt={i18n.t("DEPOSIT_CONFIRMDATA_INFORMATION")}
                />
              </a>
            </Grid>
          </Hidden>
        </Grid>
      </div>
    );
  }
}

ConfirmData.propTypes = {
  modalStep: PropTypes.number,
  setModalSteps: PropTypes.func,
  loading: PropTypes.bool
};

const mapStateToProps = store => ({
  modalStep: store.deposit.modalStep
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setLoading,
      setModalSteps
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmData);
