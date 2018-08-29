import React from "react";

// COMPONENTS
import LeasingHistory from "./leasingHistory";
import Modal from "../../components/modal";
import StartLeasing from "./modal/startLeasing";

class Leasing extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    }
  }
  handleModalLeasing = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    let { isOpen } = this.state;
    return <div>
      <div>
        <LeasingHistory openModal={this.handleModalLeasing} />
      </div>
      <Modal
        title={"Iniciar Leasing"}
        content={<StartLeasing />}
        show={isOpen}
        close={() => this.handleModalLeasing()}
      />
    </div>;
  }
}

export default Leasing;
