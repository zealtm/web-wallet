import React from "react";
import PropTypes from "prop-types";

// REDUX
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import { confirmPay } from "../redux/paymentAction";

// UTILS
import i18n from "../../../utils/i18n";

// COMPONENTS 
import Loading from "../../../components/loading";

// STYLES
import style from "./style.css";

class DonePayment extends React.Component {
  constructor(props) {
    super(props);
  }

  doTransaction = () => {
    
  };

  componentDidMount(){
    let { user, payment, coins, confirmPay } = this.props;
   
    const coin = payment.coin.abbreviation;
  
    const payload = {
      coin:           coin,
      fromAddress:    coins[coin].address,
      toAddress:      payment.coin.address,
      amount:         payment.amount,
      fee:            payment.fee.fee.fee,
      feePerByte:     payment.fee.fee.feePerByte,
      feeLunes:       payment.fee.fee.feeLunes,
      price:          coins[coin].price,
      decimalPoint:   coins[coin].decimalPoint, 
      user:           user.password, 
      payment:        payment,
    }

    confirmPay(payload);

    return;
  }

  render() {
    const {payment, loading} = this.props;
    if(loading){
      return (
        <div className={style.modalBox}>
          <Loading color="lunes" />
        </div>
      )
    }else{
      return (
        <div className={style.modalBox}>
          <img
            src="/images/icons/confirm/confirm.png"
            className={style.imageResult}
          />
          {/* <img src="/images/icons/error/error.png" /> */}
          <div>
            {i18n.t("PAYMENT_SUCCESS_1")}
            <span className={style.textGreen}>R$ {payment.value || null}</span>
            {i18n.t("PAYMENT_SUCCESS_2")}
          </div>

          <div className={style.smallDescription}>
            {i18n.t("PAYMENT_TEXT_HISTORY")}
          </div>
        </div>
      );
    }
  }
}

DonePayment.propTypes = {
  payment: PropTypes.object.isRequired
}

const mapStateToProps = store => ({
  payment: store.payment.payment, 
  loading: store.payment.loading,
  coins: store.skeleton.coins,
  user: store.user.user,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { 
    confirmPay
  }, 
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DonePayment);
