import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// COMPONENTS
import Create from "./create";
import Email from "./emailMessage";

class Login extends React.Component {
  renderContent = () => {
    let { create } = this.props.user.pages;
    console.warn(create)
    if (create === 0) return <Create />;    
    if (create === 1) return <Email />;
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
