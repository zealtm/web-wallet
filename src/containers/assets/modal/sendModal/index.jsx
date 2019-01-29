import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";

// COMPONENTS
import BoxAddress from "./boxAddress";
import BoxAmount from "./boxAmount";
import BoxFee from "./boxFee";
import BoxConfirm from "./boxConfirm";
import BoxProcess from "./boxProcess";
import BoxResult from "./boxResult";
import BoxResultError from "./boxResultError";

// STYLE
import style from "../../style.css";

class SendModal extends React.Component {
  renderContent = () => {
    let { modal } = this.props;
    
    if (modal === 0) return <BoxAddress coin="lunes" />;
    if (modal === 1) return <BoxAmount coin="lunes" />;
    if (modal === 2) return <BoxFee coin="lunes" />;
    if (modal === 3) return <BoxConfirm coin="lunes" />;
    if (modal === 4) return <BoxProcess coin="lunes" />;
    if (modal === 5) return <BoxResult coin="lunes" />;
    if (modal === 6) return <BoxResultError coin="lunes" />;
  };

  render() {
    return <div className={style.baseStep}>{this.renderContent()}</div>;
  }
}

SendModal.propTypes = {
  modal: PropTypes.number.isRequired
};

const mapSateToProps = store => ({
  modal: store.assets.modal
});

export default connect(
  mapSateToProps,
  null
)(SendModal);
