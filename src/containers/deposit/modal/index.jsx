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

    if (modalStep === 3 && paymentMethod === 1)
      return <PayModal />;
    if (modalStep === 3 && paymentMethod === 2)
      return <BankModal />;

    return <DebitCancel />;
  };

  render() {
    return this.renderModalContent();
  }
}

DepositModal.propTypes = {
  modalStep: PropTypes.number,
  paymentMethod: PropTypes.number
};

const mapStateToProps = store => ({
  modalStep: store.deposit.modalStep,
  paymentMethod: store.deposit.payloadPayment.paymentMethodId
});

export default connect(
  mapStateToProps,
  null
)(DepositModal);
