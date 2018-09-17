import React from "react";
import PropTypes from "prop-types";

// REDUX
import {connect} from "react-redux";

// UTILS
import i18n from "../../../utils/i18n";

// STYLES
import style from "./style.css";

class DoneRecharge extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <div className={style.modalBox}>
        <img
          src="/images/icons/confirm/confirm.png"
          className={style.imageResult}
        />
        {/* <img src="/images/icons/error/error.png" /> */}
        <div>
          {i18n.t("RECHARGE_SUCCESS_1")}
          <span className={style.textGreen}>R$ 30,00</span>
        </div>

        <div className={style.smallDescription}>
          {i18n.t("RECHARGE_SUCCESS_2")}
        </div>
      </div>
    );
  }
}

DoneRecharge.propTypes = {
  //payment: PropTypes.object.isRequired
}

const mapStateToProps = store => ({
  //payment: store.payment.payment
});

export default connect(
  mapStateToProps
)(DoneRecharge);