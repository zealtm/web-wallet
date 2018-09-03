import React from "react";

// UTILS
import i18n from "../../utils/i18n";

// COMPONENTS
import Modal from "../../components/modal";
import PaymentTitleModal from "./modal/paymentTitleModal";

class Payment extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: true
    }
  }
  handleModal = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    let { isOpen } = this.state;
    return (
      <div>
        <Modal
          title={i18n.t("PAYMENT_MODAL_TITLE")}
          content={<PaymentTitleModal />}
          show={isOpen}
          // close={() => this.handleModal()}
          back={()=>this.handleModal()}
        />
      </div>
    )
  }
}

export default Payment;
