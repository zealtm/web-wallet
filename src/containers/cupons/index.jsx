import React from "react";

// COMPONENTS
import InstructionsModal from "./instructionsModal"
import Modal from "../../components/modal";
import i18n from "../../../../utils/i18n";

class Cupons extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: false
        };
    }

    handleModal= () => this.setState({isOpen: !this.state.isOpen});

    render() {
        let { isOpen } = this.state;
        return (
            <div>
                <p onClick={() => this.handleModal()}>Clique aqui!</p>
                <Modal
                    title={"Instructions"}
                    content={<InstructionsModal />}
                    show={isOpen}
                    close={() => this.handleModal()}
                />
            </div>
        );
    }
}



export default Cupons
