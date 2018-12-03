import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// COMPONENTS
import Footer from "../footer";
import Error from "./components/error";

// STYLE
import style from "../style.css";

class Validate extends React.Component {
  render() {
    return (
      <div className={style.contGeneral}>
        <Error />
        <Footer />
      </div>
    );
  }
}

Validate.propTypes = {
  user: PropTypes.object
};

const mapSateToProps = store => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(Validate);
