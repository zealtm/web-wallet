import React from "react";

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
          title={"Pagamento de Boleto"}
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
