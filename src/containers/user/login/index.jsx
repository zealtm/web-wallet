import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// COMPONENTS
import Auth from "./auth";
import Pin from "./pin";
import MultiFactorAuth from "./multifactorauth";

class Login extends React.Component {
  renderContent = () => {
    let { page } = this.props.user;

    if (page === 0) return <Auth />;
    if (page === 1) return <MultiFactorAuth />
    if (page === 2) return <Pin />;
    // if (page === 3) return <Seed />
  };

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object
};

const mapSateToProps = store => ({
  user: store.user
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(Login);
