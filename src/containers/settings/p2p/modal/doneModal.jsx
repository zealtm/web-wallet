import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalStep } from "../../../p2p/redux/p2pAction";

// UTILS
import i18n from "../../../../utils/i18n";

// STYLE
import style from "./style.css";

class DoneModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={style.modalBox}>
        <img
          src={"/images/icons/confirm/confirm.png"}
          className={style.iconInfor}
        />
        <div className={style.totalConfirm}>
          <span>{i18n.t("P2P_SIGNATURE_CONFIRM")}</span>
        </div>
      </div>
    );
  }
}
DoneModal.propTypes = {
  setModalStep: PropTypes.func.isRequired
};
const mapStateToProps = store => ({
  modalStep: store.p2p.modalStep
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setModalStep
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoneModal);
