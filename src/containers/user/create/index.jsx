import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// COMPONENTS
import CreateUser from "./createUser";
import Email from "./emailMessage";

class Create extends React.Component {
  renderContent = () => {
    let { create } = this.props.user.pages;
    
    if (create === 0) return <CreateUser />;    
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

Create.propTypes = {
  user: PropTypes.object
};

const mapSateToProps = store => ({
  user: store.user
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(Create);
