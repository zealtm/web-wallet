import React, { Component } from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";

//COMPONENTS
import PayModal from "./payModal";
import DebitCancel from "./debitCancel";
import Information from "./informations";
import ConfirmData from "./confirmData";
import BankModal from "./bankModal";

// UTILS
import i18n from "../../../utils/i18n";
class DepositModal extends Component {
  renderModalContent = () => {
    const { modalStep, paymentMethod } = this.props;

    if (modalStep === 1) return <Information />;
    if (modalStep === 2) return <ConfirmData />;

    if (modalStep === 3 && paymentMethod === i18n.t("DEPOSIT_INVOICE"))
      return <PayModal />;
    if (modalStep === 3 && paymentMethod === i18n.t("DEPOSIT_DEBIT"))
      return <BankModal />;

    return <DebitCancel />;
  };

  render() {
    return this.renderModalContent();
  }
}

DepositModal.propTypes = {
  modalStep: PropTypes.number,
  paymentMethod: PropTypes.string
};

const mapStateToProps = store => ({
  modalStep: store.deposit.modalStep,
  paymentMethod: store.deposit.SelectedPaymentMethod
});

export default connect(
  mapStateToProps,
  null
)(DepositModal);
