import React from "react";

// COMPONENTS
import InstructionsModal from "./instructionsModal"
import Modal from "../../components/modal";


class Cupons extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        // let {setWalletReceiveModalOpen} = this.props;
        return (
            <div>
                <p>Cupons</p>
                <Modal
                    title={"Instructions"}
                    content={<InstructionsModal />}
                    show
                    back
                />
            </div>
        );
    }
}

export default Cupons
