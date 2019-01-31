import React, { Component } from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";

//COMPONENTS
import BankModal from "./bankModal";
import DebitCancel from "./debitCancel";
import Information from "./informations";
import ConfirmData from "./confirmData";

class DepositModal extends Component {
  renderModalContent = () => {
    const { modalStep } = this.props;

    if (modalStep === 1) return <Information />;
    if (modalStep === 2) return <ConfirmData />;
    if (modalStep === 3) return <BankModal />;

    return <DebitCancel />;
  };

  render() {
    return this.renderModalContent();
  }
}

DepositModal.propTypes = {
  modalStep: PropTypes.number
};

const mapStateToProps = store => ({
  modalStep: store.deposit.modalStep
});

export default connect(
  mapStateToProps,
  null
)(DepositModal);
