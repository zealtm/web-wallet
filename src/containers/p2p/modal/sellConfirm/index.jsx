import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { openConfirmSell } from "../../redux/p2pAction";
import { Close } from "@material-ui/icons/";

// UTILS
import i18n from "../../../../utils/i18n";

// STYLE
import style from "./style.css";

class SellConfirmModal extends React.Component {
  render() {
    const { openConfirmSell } = this.props;
    return (
      <div className={style.containerSellConfirm}>
        <div div>
          <Close
            className={style.arrowBack}
            onClick={() => openConfirmSell(false)}
          />
        </div>
        <img
          alt={"sell-confirm"}
          src="/images/modal/sell-confirm.png"
          className={style.imgSellConfirm}
        />
        <div>
          <p className={style.textSellConfirm}> {i18n.t("P2P_TEXT_13")}</p>
        </div>
        <div className={style.boxBtnSellConfirm}>
          <button className={style.btnSellConfirm}>
            {i18n.t("P2P_BUTTON_CONFIRM_RECEIPT")}
          </button>
        </div>
      </div>
    );
  }
}

SellConfirmModal.propTypes = {
  openConfirmSell: PropTypes.func
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openConfirmSell
    },
    dispatch
  );
export default connect(
  null,
  mapDispatchToProps
)(SellConfirmModal);
