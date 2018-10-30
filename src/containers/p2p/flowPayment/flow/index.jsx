import React from "react";
// STYLE
import InforModal from "./inforModal"
import ConfirmModal from "./confirmModal"
import PropTypes from "prop-types";
// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class FlowModal extends React.Component {
    constructor(props) {
        super(props);
    }    
    render() {
        const { modalStep } = this.props;

        switch (modalStep) {
            case 1:
                return <ConfirmModal />;
            case 2:
                return <InforModal />;
        }
    }
}

FlowModal.propTypes = {
    modalStep: PropTypes.number.isRequired
}
const mapStateToProps = store => ({
    modalStep: store.p2p.modalStep
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FlowModal);