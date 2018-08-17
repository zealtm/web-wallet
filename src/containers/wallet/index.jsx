import React from "react";

// COMPONENTS
import CoinsBar from "./coinsBar";
import CoinsInfo from "./coinsInfo";
import Modal from "../../components/modal";
import SendModal from "./modal/sendModal/";

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalSend: true
    };
  }
  render() {
    return (
      <div>
        <CoinsBar />
        <CoinsInfo />
        <Modal
          title={"Transação"}
          content={<SendModal />}
          show={this.state.modalSend}
        />
      </div>
    );
  }
}

export default Wallet;
