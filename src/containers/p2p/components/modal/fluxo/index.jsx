import React from "react";
// STYLE
import InforModal from "./inforModal"
import ConfirmModal from "./confirmModal"
import PropTypes from "prop-types";

class FluxoModal extends React.Component {
    constructor(props) {
        super(props);
    }
    renderContent = () => {
        const { modalStep } = this.props;

        switch (modalStep) {
            case 1:
                return <ConfirmModal />;
            case 2:
                return <InforModal />;
        }
    }
    render() {
        return <div>{this.renderContent()}</div>;
    }
}

FluxoModal.propTypes = {
    modalStep: PropTypes.number.isRequired
}
export default (FluxoModal);