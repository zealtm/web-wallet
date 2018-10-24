import React from "react";
import PropTypes from "prop-types";

import Modal from "../../../components/modal";
import FluxoModal from "./flow/";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalStep, openModal } from "../redux/p2pAction";

class ModalPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
  }
  
  handleModal= () => this.setState({isOpen: !this.state.isOpen});

  closeModal() {
    const { setModalStep, openModal } = this.props;
    openModal(false);
    setModalStep(1);
  }

  render() {
    const { isOpen } = this.state;
    const { modalOpen } = this.props;
    return (
      <div>
        <Modal
          content={<FluxoModal />}
          show={modalOpen}
          close={() => this.handleModal() }         
        />
      </div>
    );
  }
}
ModalPayment.propTypes = {
  modalStep: PropTypes.number.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  setModalStep: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired
}
const mapStateToProps = store => ({
  modalStep: store.p2p.modalStep,
  modalOpen: store.p2p.modalOpen,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setModalStep, 
    openModal
  }, 
  dispatch
);

export default connect(
  mapStateToProps, 
  mapDispatchToProps
) (ModalPayment);