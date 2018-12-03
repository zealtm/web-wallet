import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// COMPONENTS
//import Footer from "../footer";

// STYLE
import style from "./style.css";

class Error extends React.Component {
  render() {
    return (
      <div className={style.baseMessage}>
        <img src="../../images/logo.svg" className={style.icon} />
        <p className={style.messageError}>Seu e-mail nao foi verificado, por favor tente novamente clicando no botão abaixo.</p>
        <a href="#" className={style.buttonEnable} >Reenviar confirmação</a>
      </div>
    );
  }
}

Error.propTypes = {
};

const mapSateToProps = store => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(Error);
