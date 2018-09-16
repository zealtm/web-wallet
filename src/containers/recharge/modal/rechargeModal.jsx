import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalStep } from "../redux/rechargeAction";

// COMPONENTS
import DetailsRecharge from "./detailsRecharge";
import FeeRecharge from "./feeRecharge";
import ConfirmRecharge from "./confirmRecharge";
import SecureRecharge from "./secureRecharge";
import DoneRecharge from "./doneRecharge";

class RechargeModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { modalStep } = this.props;

    switch(modalStep){
      case 1:
        return <DetailsRecharge handleStep={this.handleStep} />
      case 2:
        return <FeeRecharge handleStep={this.handleStep} />
      case 3: 
        return <ConfirmRecharge handleStep={this.handleStep} />
      case 4:
        return <SecureRecharge handleStep={this.handleStep} />
      case 5: 
        return <DoneRecharge handleStep={this.handleStep} />
    }
  }
}

RechargeModal.propTypes = {
  modalStep:    PropTypes.number.isRequired,
  loading:      PropTypes.bool.isRequired,
  setModalStep: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  modalStep:  store.recharge.modalStep,
  loading:    store.recharge.loading
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
)(RechargeModal);