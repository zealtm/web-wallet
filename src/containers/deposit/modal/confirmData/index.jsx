import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setModalSteps,
  setLoading,
  createDepositBill,
  createDepositDebit
} from "../../redux/depositAction";
import PropTypes from "prop-types";
import i18n from "../../../../utils/i18n";
import style from "./style.css";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import ButtonContinue from "../../../../components/buttonContinue";

class ConfirmData extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false
    };
  }
  confirmDeposit = () => {
    const {
      payloadPayment,
      userData,
      createDepositBill,
      setModalSteps,
      createDepositDebit
    } = this.props;
    this.setState({loading: true});
    let payload = {
      service: payloadPayment.service,
      packageId: payloadPayment.packageId,
      paymentMethodId: payloadPayment.paymentMethodId,
      userData: {
        fullName: userData.fullName,
        document: userData.document,
        address: {
          street: userData.address,
          city: userData.city,
          state: userData.state,
          country: "BR",
          zipcode: userData.cep
        }
      }
    };
    if (payloadPayment.paymentMethodId === 1) {
      createDepositBill(payload);
    }else{
      createDepositDebit(payload);
    }
  };
  render() {
    const { userData, selectedValue } = this.props;
    const {loading} = this.state;
    
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
              <span className={style.ConfirmDataNum}>{selectedValue}</span>
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
            <span className={style.ConfirmDataField}>{userData.fullName}</span>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className={style.ConfirmDataDiv}>
              {userData.documentType.toUpperCase()}
            </div>
            <span className={style.ConfirmDataField}>{userData.document}</span>
          </Grid>

          <Grid item xs={12} sm={4}>
            <div className={style.ConfirmDataDiv}>
              {i18n.t("DEPOSIT_CONFIRMDATA_STATE_TITLE")}
            </div>
            <span className={style.ConfirmDataField}>{userData.stateName}</span>
          </Grid>

          <Grid item xs={12} sm={4}>
            <div className={style.ConfirmDataDiv}>
              {i18n.t("DEPOSIT_CONFIRMDATA_CITY_TITLE")}
            </div>
            <span className={style.ConfirmDataField}>{userData.city}</span>
          </Grid>

          <Grid item xs={12} sm={4}>
            <div className={style.ConfirmDataDiv}>
              {i18n.t("DEPOSIT_CONFIRMDATA_CEP_TITLE")}
            </div>
            <span className={style.ConfirmDataField}>{userData.zipcode}</span>
          </Grid>

          <Grid item xs={12} sm={12}>
            <div className={style.ConfirmDataDiv}>
              {i18n.t("DEPOSIT_CONFIRMDATA_ADDRESS_TITLE")}
            </div>
            <span className={style.ConfirmDataField}>{userData.address}</span>
          </Grid>

          {/* <Grid item xs={12} sm={6}>
            <div className={style.ConfirmDataDiv}>
              {i18n.t("DEPOSIT_CONFIRMDATA_RECURRENT_TITLE")}
            </div>
            <span className={style.ConfirmDataField}>
              {i18n.t("DEPOSIT_CONFIRMDATA_RECURRENT")}
            </span>
          </Grid> */}

          {/* <Grid item xs={12} sm={6}>
            <div className={style.ConfirmDataDiv}>
              {i18n.t("DEPOSIT_CONFIRMDATA_SCHEDULING_TITLE")}
            </div>
            <span className={style.ConfirmDataField}>
              {i18n.t("DEPOSIT_CONFIRMDATA_SCHEDULING")}
            </span>
          </Grid> */}

          <Grid item xs={12} style={{}}>
            <ButtonContinue
              label={i18n.t("DEPOSIT_CONFIRMDATA_BTN_CONFIRM")}
              action={() => this.confirmDeposit()}
              loading={loading}
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
  loading: PropTypes.bool,
  userData: PropTypes.object,
  selectedValue: PropTypes.number,
  createDepositBill: PropTypes.func,
  payloadPayment: PropTypes.object,
  createDepositDebit: PropTypes.func
};

const mapStateToProps = store => ({
  modalStep: store.deposit.modalStep,
  userData: store.deposit.user,
  selectedValue: store.deposit.selectedValue,
  payloadPayment: store.deposit.payloadPayment,
  loading: store.deposit.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setLoading,
      setModalSteps,
      createDepositBill,
      createDepositDebit
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmData);
