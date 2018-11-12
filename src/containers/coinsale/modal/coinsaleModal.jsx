import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// COMPONENTS
import FeeCoinsale from "./feeCoinsale";
import SecureCoinsale from "./secureCoinsale";
import DoneCoinsale from "./doneCoinsale";
import ErrorCoinsale from "./errorCoinsale";

class CoinsaleModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { modalStep } = this.props;

    switch (modalStep) {
      case 1:
        return <FeeCoinsale />;
      case 2:
        return <SecureCoinsale />;
      case 3:
        return <DoneCoinsale />;
      case 4:
        return <ErrorCoinsale />;
    }
  }
}

CoinsaleModal.propTypes = {
  modalStep: PropTypes.number.isRequired
};

const mapStateToProps = store => ({
  modalStep: store.buy.modalStep
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoinsaleModal);
