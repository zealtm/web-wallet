import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setWalletLoading } from "./redux/walletAction";

class Wallet extends React.Component {
  /* eslint-disable */
  loading = () => {
    return new Promise(resolve => {
      console.warn("TESTE");
    });
  };
}

Wallet.propTypes = {
  skeleton: PropTypes.object,
  setWalletLoading: PropTypes.func
};

const mapSateToProps = store => ({
  wallet: store.wallet
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setWalletLoading
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(Wallet);
