import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setWalletLoading } from "./redux/walletAction";

// COMPONENTS
import CoinsBar from "./coinsBar";
import CoinsInfo from "./coinsInfo";

class Wallet extends React.Component {

  renderContent = () => {
    // let { loading } = this.props.wallet;

    // if (loading) {
    //   return <div>Carregando...</div>;
    // }

    return (
      <div>
        <CoinsBar />
        <CoinsInfo />
      </div>
    );
  };

  render() {
    return this.renderContent();
  }
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
