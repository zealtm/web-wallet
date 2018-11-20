import React from "react";
import PropTypes from "prop-types";

// UTILS
import i18n from "../../../utils/i18n";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  acceptOfferWhenBuying,
  closeChat,
  closeDeposit
} from "../../redux/p2pAction";

import style from "./style.css";

class DepositModal extends React.Component {
  cleanChat = () => {
    const { closeChat, closeDeposit } = this.props;
    closeChat();
    closeDeposit();
  };
  render() {
    const { order } = this.props;
    return (
      <div className={style.depositContainer}>
        <div className={style.textDeposit}>
          {i18n.t("P2P_TEXT_4")}
        </div>
        <img
          src="/images/modal/Group 323.png"
          className={style.imgQrCodeDeposit}
        />
        <div className={style.inputCopyBtnDeposit}>
          <input className={style.inputDeposit} value={order.sell.address} />
          <button className={style.copyCodeDeposit}>{i18n.t("P2P_TEXT_5")}</button>
          <button className={style.btnDeposit} onClick={this.cleanChat}>
            {i18n.t("P2P_TEXT_6")}
          </button>
        </div>
      </div>
    );
  }
}

DepositModal.propTypes = {
  closeChat: PropTypes.func,
  closeDeposit: PropTypes.func
};

const mapStateToProps = store => ({
  order: store.p2p.chat.iduser
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { acceptOfferWhenBuying, closeChat, closeDeposit },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepositModal);
