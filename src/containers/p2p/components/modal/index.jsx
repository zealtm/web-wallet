import React from "react";

import Modal from "../../../../components/modal";
import ConfirmModal from "./fluxo/confirmModal";

class ModalPayment extends React.Component {
    constructor() {
        super();
        this.state = {
          isOpen: true
        };
      }
      
      handleModal= () => this.setState({isOpen: !this.state.isOpen});
      render() {
        let { isOpen } = this.state;
        let { modal } = this.props;
        return (
          <div>
            { modal &&
              <Modal                
                content={<ConfirmModal />}
                show={isOpen}
                close={() => this.handleModal()}
            />
            }
            
          </div>
        );
      }
}
export default ModalPayment;