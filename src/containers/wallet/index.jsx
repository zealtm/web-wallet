import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setWalletLoading } from "./redux/walletAction";

// COMPONENTS
import CoinsBar from "./coinsBar";
import CoinsInfo from "./coinsInfo";
import Modal from "../../components/modal";
import SendModal from "./modal/sendModal/";

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalSend: true
    };
  }

  renderContent = () => {
    let { loading } = this.props.wallet;
    // console.warn("loading", loading);
    // let { setWalletLoading } = this.props;

    // setWalletLoading(true);

    if (loading) {
      return <div>Carregando...</div>;
    }

    return (
      <div>
        <CoinsBar />
        <CoinsInfo />
        <Modal
          title={"Transação"}
          content={<SendModal />}
          show={this.state.modalSend}
        />
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
