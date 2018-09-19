import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getUserGdpr,
  setUserGdpr,
  setModalStep
} from "../redux/rechargeAction";

// UTILS
import i18n from "../../../utils/i18n";

// STYLES
import style from "./style.css";

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
      errorMsg: "",
      user: props.user
    };
  }

  openError = message => {
    this.setState({
      ...this.state,
      error: true,
      errorMsg: message
    });

    setTimeout(() => {
      this.setState({
        ...this.state,
        error: false,
        errorMsg: ""
      });
    }, 4100);
  };

  validateForm = () => {
    const { setModalStep } = this.props;
    setModalStep(2);
  };

  toogleSwitch = () => {
    //TODO
  };

  render() {
    const { loading } = this.props;
    const { user, error, errorMsg } = this.state;

    if (loading) {
      return (
        <div className={style.modalBox}>
          <Loading color="lunes" />
        </div>
      );
    } else {
      return (
        <div className={style.modalBox}>
          <div>
            {error ? <ModalBar type="error" message={errorMsg} timer /> : null}
          </div>
          {i18n.t("RECHARGE_DETAILS_1")}
          <div className={style.strongText} style={{ marginTop: 20 }}>
            <span className={style.textGreen}>5000 LUNES</span>
            {i18n.t("RECHARGE_DETAILS_2")}
            <span className={style.textGreen}>R$ 30,00</span>

            {i18n.t("RECHARGE_DETAILS_3")}
          </div>

          <div
            style={{
              fontSize: "24px",
              textAlign: "center",
              marginTop: 30,
              marginBottom: 30
            }}
          >
            (19) 99990-9999
          </div>

          <CustomSwitch
            title={i18n.t("GDPR_TITLE")}
            description={i18n.t("GDPR_DESC")}
            action={this.toogleSwitch}
            checked={user.gdpr === "read"}
            value="gdprSwitch"
          />

          <ButtonContinue
            label={i18n.t("BTN_CONFIRM")}
            action={() => this.validateForm()}
            loading={loading}
          />
        </div>
      );
    }
  }
}

DetailsRecharge.propTypes = {
  loading: PropTypes.bool,
  setModalStep: PropTypes.func,
  getUserGdpr: PropTypes.func,
  setUserGdpr: PropTypes.func
};

const mapStateToProps = store => ({
  loading: store.recharge.loading,
  user: store.user.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setModalStep,
      getUserGdpr,
      setUserGdpr
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsRecharge);
