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
import ErrorDeposit from "./error/errorDeposit";
// UTILS
import i18n from "../../../utils/i18n";
class DepositModal extends Component {
  renderModalContent = () => {
    const { modalStep } = this.props;
    console.log("slep : "+ modalStep);
    if (modalStep === 1) return <Information />;
    if (modalStep === 2) return <ConfirmData />;

    if (modalStep === 3)
      return <PayModal />;
    if (modalStep === 5)
      return <BankModal />;
    if(modalStep === 4)
      return <ErrorDeposit />
    else 
      return <ErrorDeposit />
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
});

export default connect(
  mapStateToProps,
  null
)(DepositModal);
