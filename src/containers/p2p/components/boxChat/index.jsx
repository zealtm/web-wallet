import React from "react";
import PropTypes from "prop-types";

// REDUX
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  buySetter,
  setter,
  getPaymentMethodsWhenBuying,
  acceptOfferWhenBuying,
  createOfferWhenSelling
} from "./../../redux/p2pAction";

// STYLE
import style from "./style.css";

class BoxChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myId: undefined
    };
  }

  render() {
    return (
      <div className={style.boxChat}>
       
      </div>
    );
  }
}

BoxChat.propTypes = {
  getPaymentMethodsWhenBuying: PropTypes.func.isRequired,
  acceptOfferWhenBuying: PropTypes.func.isRequired,
  createOfferWhenSelling: PropTypes.func.isRequired,
  buySetter: PropTypes.func.isRequired,
  setter: PropTypes.func.isRequired,
  p2p: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  p2p: state.p2p,
  user: state.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setter,
      buySetter,
      getPaymentMethodsWhenBuying,
      acceptOfferWhenBuying,
      createOfferWhenSelling
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoxChat);
