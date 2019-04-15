import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
//UTILS
import i18n from "../../../../utils/i18n";

//STYLE
import style from "./style.css";

class BankModal extends Component {
  constructor() {
    super();
  }

  render() {
    const { depositReturn } = this.props;
    return (
      <div className={style.modalBox}>
        <strong>{i18n.t("DEPOSIT_ACCOUNT_MODAL_HEADER")}</strong>
        <div>
          <a href={depositReturn.url} target="__blank">
            <img
              style={{ height: "113px" }}
              src="images/icons/deposit/mastercard-icon.png"
              alt={i18n.t("BANK_ICON")}
            />
          </a>
        </div>
        <div>
          <a href={depositReturn.url} target="__blank">
            <img
              src="images/icons/deposit/visa-icon.png"
              alt={i18n.t("BANK_ICON")}
            />
          </a>
        </div>

        <p>{i18n.t("DEPOSIT_ACCOUNT_MODAL_CONTENT")}</p>
      </div>
    );
  }
}
BankModal.propTypes = {
  depositReturn: PropTypes.object
};
const mapStateToProps = store => ({
  depositReturn: store.deposit.depositReturn
});

export default connect(mapStateToProps)(BankModal);
