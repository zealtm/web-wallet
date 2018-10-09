import React from "react";
import PropTypes from "prop-types";

import Modal from "../../../../components/modal";
import FluxoModal from "./fluxo/";

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
                content={<FluxoModal modalStep = { 2 } />}
                show={isOpen}
                close={() => this.handleModal()}
            />
            }
            
          </div>
        );
      }
}
ModalPayment.propTypes = {}
export default ModalPayment;