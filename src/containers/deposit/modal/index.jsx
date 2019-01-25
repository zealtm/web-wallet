import React, { Component } from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";

//COMPONENTS
import BankModal from "./modal/bankModal";
import DebitCancel from "./modal/debitCancel";
import Information from "./modal/information";

class DepositModal extends Component {
  componentDidMount() {}

  renderModalContent = () => {
    const { modalStep } = this.props;
    const modalInformation = <Information />;

    if (modalStep === 1) return modalInformation;
    if (modalStep === 2) return <BankModal />;
    if (modalStep === 3) return <DebitCancel />;

    return modalInformation;
  };

  render() {
    return this.renderModalContent();
  }
}

DepositModal.propTypes = {
  modalStep: PropTypes.number
};

const mapStateToProps = store => ({
  modalSteps: store.deposit.modalStep
});

export default connect(
  mapStateToProps,
  null
)(DepositModal);
