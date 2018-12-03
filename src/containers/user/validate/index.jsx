import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// COMPONENTS
import Footer from "../footer";
import EmailSuccess from "./components/success";
import Error from "./components/error";

// STYLE
import style from "../style.css";

class Validate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailSuccess: true
    };
  }
  render() {
    return (
      <div className={style.contGeneral}>
        {(this.state.emailSuccess) ? <EmailSuccess /> : <Error />}
        <Footer />
      </div>
    );
  }
}

Validate.propTypes = {
  user: PropTypes.object,
  emailSuccess: PropTypes.bool
};

const mapSateToProps = store => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(Validate);
