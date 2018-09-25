import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import i18n from "../../../utils/i18n";
import style from "./style.css";

// COMPONENTS
import Loading from "../../../components/loading";


class DoneRecharge extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {loading} = this.props;
    if (loading) {
      return (
        <div className={style.modalBox}>
          <Loading color="lunes" />
        </div>
      )
    } else {
      return (
        <div className={style.modalBox}>
          <img
            src="/images/icons/confirm/confirm.png"
            className={style.imageResult}
          />
          <div>
            {i18n.t("RECHARGE_SUCCESS_1")}
            {i18n.t("RECHARGE_SUCCESS_2")}
          </div>

          <div className={style.smallDescription}>
            {i18n.t("PAYMENT_TEXT_HISTORY")}
          </div>
        </div>
      );
    }
  }
}

DoneRecharge.propTypes = {
  loading: PropTypes.bool.isRequired
}

const mapStateToProps = store => ({
  loading: store.recharge.loading,
});

export default connect(mapStateToProps)(DoneRecharge);
