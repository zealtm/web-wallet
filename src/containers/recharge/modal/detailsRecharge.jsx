import React from "react";
import PropTypes from "prop-types";
import NumberMask from "react-number-format";
// REDUX
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getUserGdpr, setUserGdpr,setModalStep} from "../redux/rechargeAction";

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
import Loading from "../../../components/loading";

class DetailsRecharge extends React.Component {
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
    const {setModalStep} = this.props;
    // const {user, error} = this.state;

    // if (user.gdpr === 'unread') {
    //   this.openError(i18n.t("PAYMENT_GDPR_ERROR"));
    //   return;
    // }

    // if (!payment.amount || parseFloat(payment.amount) > payment.balance) {
    //   this.openError(i18n.t("PAYMENT_AMOUNT_ERROR"));
    //   return;
    // }

    // atualizar reducer com o proximo modal
    // Atualizar GDPR no estado e no banco (???)

    setModalStep(2);
  }

  toogleSwitch = () => {
    // const {user} = this.state;
    // const {setUserGdpr} = this.props;
    // const newStatus = user.gdpr === 'read' ? 'unread' : 'read';

    // this.setState({
    //   ...this.state,
    //   user: {
    //     ...user,
    //     gdpr: newStatus
    //   }
    // });

    // setUserGdpr({gpdr: newStatus});
  }

  render() {
    const {loading} = this.props;
    const {user, error, errorMsg} = this.state;

    if(loading){
      return (
        <div className={style.modalBox}>
          <Loading color="lunes" />
        </div>
      )
    }else{
      return (
        <div className={style.modalBox}>
          <div>
            {error ? <ModalBar type="error" message={errorMsg} timer /> : null}
          </div>
          {i18n.t("RECHARGE_DETAILS_1")}
          <div className={style.strongText} style={{ marginTop: 20 }}>
            {/* <span className={style.textGreen}>{payment.amount} {payment.coin.abbreviation}</span> */}
            <span className={style.textGreen}>5000 LUNES</span>
            {i18n.t("RECHARGE_DETAILS_2")}
            <span className={style.textGreen}>R$ 30,00</span>

            {i18n.t("RECHARGE_DETAILS_3")}
          </div>

          <div style={{fontSize:"24px", textAlign:"center", marginTop:30,marginBottom:30}}>(19) 99990-9999</div>
          
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
}

DetailsRecharge.propTypes = {
  loading:        PropTypes.bool.isRequired,
  setModalStep:   PropTypes.func.isRequired,
  getUserGdpr:    PropTypes.func.isRequired,
  setUserGdpr:    PropTypes.func.isRequired
}

const mapStateToProps = store => ({
  loading:  store.recharge.loading,
  user:     store.user.user,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setModalStep,
    getUserGdpr,
    setUserGdpr,
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsRecharge);