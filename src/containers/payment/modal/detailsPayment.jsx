import React from "react";
import PropTypes from "prop-types";
import NumberMask from "react-number-format";
// REDUX
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getUserGdpr, setUserGdpr} from "../redux/paymentAction";

// UTILS
import i18n from "../../../utils/i18n";
import {formatCpfCnpj} from "../../../utils/strings";

// STYLES
import style from "./style.css";

// MATERIAL
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";

// COMPONENTS
import CustomSwitch from "./component/customSwitch";
import ButtonContinue from "./component/buttonContinue";
import ModalBar from "../../../components/modalBar";

class DetailsPayment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: undefined,
      errorMsg: '',
      user: props.user
    };
  }

  openError = (message) => {
    this.setState({
      ...this.state,
      error: true,
      errorMsg: message
    });

    setTimeout(() => {
      this.setState({
        ...this.state,
        error: false,
        errorMsg: ''
      });
    }, 4100); // 100ms a mais que os 4000ms do timer nocomponente ModalBar
  }

  validateForm = () => {
    const {handleStep, payment} = this.props;
    const {user, error} = this.state;

    if (user.gdpr === 'unread') {
      this.openError(i18n.t("PAYMENT_GDPR_ERROR"));
      return;
    }

    if (!payment.amount || parseFloat(payment.amount) > payment.balance) {
      this.openError(i18n.t("PAYMENT_AMOUNT_ERROR"));
      return;
    }

    // atualizar reducer com o proximo modal
    // Atualizar GDPR no estado e no banco (???)

    handleStep("next"); // aqui tem que ser chamado redux
  }

  toogleSwitch = () => {
    const {user} = this.state;
    const {setUserGdpr} = this.props;
    const newStatus = user.gdpr === 'read' ? 'unread' : 'read';

    this.setState({
      ...this.state,
      user: {
        ...user,
        gdpr: newStatus
      }
    });

    setUserGdpr({gpdr: newStatus});
  }

  componentWillMount() {
    const {getUserGdpr} = this.props;
    getUserGdpr();
  }

  render() {
    const {loading, payment} = this.props;
    const {user, error, errorMsg} = this.state;

    // const gdpr = payment.user.gdpr || user.gdpr;

    return (
      <div className={style.modalBox}>
        <div>
          {error ? <ModalBar type="error" message={errorMsg} timer /> : null}
        </div>
        {i18n.t("PAYMENT_DETAILS_TEXT_1")}
        <div className={style.strongText} style={{ marginTop: 20 }}>
          <span className={style.textGreen}>{payment.amount} {payment.coin.abbreviation}</span>
          {i18n.t("PAYMENT_DETAILS_TEXT_2")}
          <span className={style.textGreen}>R$ {payment.value}</span>
          {i18n.t("PAYMENT_DETAILS_TEXT_3")}
        </div>
        <Grid container className={style.inlineInfo}>
          <Grid item xs={6} md={3}>
            <label className={style.inlineInfoLabel}>{i18n.t("PAYMENT_TITLE_BANK")}</label>
            {payment.assignor}
          </Grid>
          <Grid item xs={6} md={3}>
            <label className={style.inlineInfoLabel}>{i18n.t("PAYMENT_TITLE_NAME")}</label>
            {payment.name}
          </Grid>
          <Grid item xs={6} md={2}>
            <label className={style.inlineInfoLabel}>{i18n.t("PAYMENT_TITLE_DATE")}</label>
            {payment.dueDate}
          </Grid>
          <Grid item xs={6} md={2} style={{padding: '0'}}>
            <label className={style.inlineInfoLabel} style={{padding: '10px'}}>{i18n.t("PAYMENT_TITLE_DOC")}</label>
            <p style={{marginTop: '-10px'}}>{formatCpfCnpj(payment.cpfCnpj)}</p>
          </Grid>
          <Hidden smDown>
            <Grid item xs={6} md={2}>
              <label className={style.inlineInfoLabel}>{i18n.t("PAYMENT_TITLE_VALUE")}</label>
              R$ {payment.value}
            </Grid>
          </Hidden>
        </Grid>
        <CustomSwitch
          title={i18n.t("GDPR_TITLE")}
          description={i18n.t("GDPR_DESC")}
          action={this.toogleSwitch}
          checked={user.gdpr === 'read'}
          value="gdprSwitch"
        />

        <ButtonContinue
          label={i18n.t("BTN_CONFIRM")}
          action={()=>this.validateForm()}
          loading={loading}
        />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  payment: store.payment.payment,
  loading: store.payment.loading,
  user: store.payment.user,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getUserGdpr,
    setUserGdpr,
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsPayment);
