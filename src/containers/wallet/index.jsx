import React from "react";
import Modal from "../../components/modal";

// COMPONENTS 
import CoinsBar from "./coinsBar";

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <CoinsBar />
        <div><Modal title={"Transação"} content={"Conteúdo"} show={true}/></div>
      </div>
    );
  }
}

export default Wallet;
