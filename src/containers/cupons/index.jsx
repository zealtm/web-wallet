import React from "react";

// COMPONENTS
import InstructionsModal from "./instructionsModal"
import Modal from "../../components/modal";


class Cupons extends React.Component {

    render() {
        return (
            <div>
                <p>Cupons</p>
                <Modal
                    title={"Instructions"}
                    content={<InstructionsModal />}
                    show={true}
                    back={true}
                />
            </div>
        );
    }
}

export default Cupons
