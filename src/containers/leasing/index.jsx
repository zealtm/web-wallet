import React from "react";

// COMPONENTS
import Modal from "../../components/modal";
import StartLeasing from "./modal/startLeasing"; 

class Leasing extends React.Component {
  constructor(){
    super();
    this.state = {
      isOpen: true
    }
  }
  handleModalLeasing = () => this.setState({isOpen: !this.state.isOpen});

  render() {
    let {isOpen} = this.state;
    return <div>
    Leasing
    <Modal
      title={"Iniciar Leasing"}
      content={<StartLeasing />}
      show={isOpen}
      back={() => this.handleModalLeasing()}
    />
    </div>;
  }
}

export default Leasing;
