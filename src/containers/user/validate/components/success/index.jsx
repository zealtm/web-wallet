import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// STYLE
import style from "./style.css";

class EmailSuccess extends React.Component {
  render() {
    return (
      <div className={style.baseMessage}>
        <img src="../../images/logo.svg" className={style.icon} />
        <p className={style.messageSuccess}>E-mail confirmado.</p>
        <Link to="/login" className={style.buttonLogin}>
          Login
        </Link>
      </div>
    );
  }
}

EmailSuccess.propTypes = {};

const mapSateToProps = store => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(EmailSuccess);
