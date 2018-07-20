import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { pageControl } from "../redux/userAction";

// COMPONENTS
import Auth from "./auth";
import Pin from "./pin";
import Footer from "../footer";

const contents = [Auth, Pin];

class Login extends React.Component {
  // nextContent = () => {
  //   let { user, pageControl } = this.props;
    
  //   if (contents[user.page + 1]) {
  //     return pageControl( user.page + 1 );
  //   }

  //   return;
  // };

  // prevContent = () => {
  //   let { user, pageControl } = this.props;

  //   if (contents[user.page - 1]) {
  //     return pageControl( user.page - 1 );
  //   }

  //   return;
  // };

  renderContent = () => {
    let { page } = this.props.user;

    if (page.step === 0) return <Auth />;
    // if (step === 1) return <2FA />
    if (page.step === 1) return <Pin />;
    // if (step === 3) return <Seed />
  };

  render() {
    return (
      <div>
        {this.renderContent()}
        <Footer />
      </div>
    );
  }
}

Login.propTypes = {
  pageControl: PropTypes.func,
  user: PropTypes.object
};

const mapSateToProps = store => ({
  user: store.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      pageControl
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(Login);
