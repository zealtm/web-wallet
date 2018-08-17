import React from "react";
import PropTypes from "prop-types";

// STYLE
import style from "./style.css";

class ButtonContinue extends React.Component {
  render() {
    const { action, label = "CONTINUAR" } = this.props;
    return (
      <button className={style.btContinueDisable} onClick={action}>
        {label}
      </button>
    );
  }
}

ButtonContinue.propTypes = {
  action: PropTypes.object.isRequired,
  label: PropTypes.string
};

export default ButtonContinue;