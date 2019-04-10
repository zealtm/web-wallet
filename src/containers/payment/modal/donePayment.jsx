import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  loadWalletInfo,
  getCreditBalance
} from "../../skeleton/redux/skeletonAction";

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

  componentDidMount() {
    const { loadWalletInfo, user, getCreditBalance, credit } = this.props;
    loadWalletInfo(user.password);
    let {available} = credit;
    getCreditBalance(available);
  }

  render() {
    const { loading } = this.props;
    if (loading) {
      return (
        <div className={style.modalBox}>
          <Loading color="lunes" />
        </div>
      );
    } else {
      return (
        <div className={style.modalBox}>
          <img
            src="/images/icons/confirm/confirm.png"
            className={style.imageResult}
          />
          <div>
            {i18n.t("PAYMENT_SUCCESS_1")}
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
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  loadWalletInfo: PropTypes.func.isRequired,
  getCreditBalance: PropTypes.func,
  credit: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

const mapStateToProps = store => ({
  loading: store.payment.loading,
  user: store.user.user,
  credit: store.skeleton.creditBalance
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadWalletInfo, getCreditBalance }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DonePayment);
