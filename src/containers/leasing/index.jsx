import React from "react";

// COMPONENTS
import Modal from "../../components/modal";
import StartLeasing from "./modal/startLeasing"; 

class Leasing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
    Leasing
    
    <Modal
      title={"Iniciar Leasing"}
      content={<StartLeasing />}
      show={true}
      back
    />
    </div>;
  }
}

export default Leasing;
