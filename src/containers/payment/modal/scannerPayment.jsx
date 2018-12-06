import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalStep } from "../redux/paymentAction";

class ScannerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barcode: "Vazio"
    };
  }

  render() {
    return (
      <div className="teste">
        <form>
          <input type="file" accept="image/*" onChange={e => this.teste(e)} />
        </form>
        Barcode: {this.state.barcode}
      </div>
    );
  }
  teste(file) {
    return;
  }
}

ScannerModal.propTypes = {
  loading: PropTypes.bool.isRequired,
  scannerModal: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  modalStep: store.payment.modalStep,
  loading: store.payment.loading
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
)(ScannerModal);
