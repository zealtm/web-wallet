import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadWalletInfo } from "../skeleton/redux/skeletonAction";
import {
  setAssetLoading,
  getAssetGeneralInfo,
  getAssetHistory
} from "./redux/assetsAction";

// COMPONENTS
import CoinsBar from "./coinsBar";
import CoinsInfo from "./coinsInfo";
import TransactionHistory from "./transactionHistory";
import Loading from "../../components/loading";

class Assets extends React.Component {
  componentDidMount() {
    let { getAssetGeneralInfo } = this.props;
    let { selectedCoin } = this.props.assets;
    getAssetGeneralInfo();
    this.setState({ lastAsset: selectedCoin })
  }

  componentDidUpdate() {
    let { /*getAssetGeneralInfo,*/ getAssetHistory, skeleton } = this.props;
    let { selectedCoin } = this.props.assets;
    if (this.state.lastAsset !== selectedCoin) {
      // getAssetGeneralInfo();
      getAssetHistory(selectedCoin, skeleton.coins.lunes.address);
      this.setState({lastAsset: selectedCoin})
    }
  }

  renderContent = () => {
    let { loading } = this.props.assets;
    if (loading) {
      return (
        <div>
          <Loading color="wallet" height="80vh" width="100px" />
        </div>
      );
    }

    return (
      <div>
        <CoinsBar />
        <div>
          <CoinsInfo />
          <TransactionHistory />
        </div>
      </div>
    );
  };

  render() {
    return this.renderContent();
  }
}

Assets.propTypes = {
  user: PropTypes.object,
  assets: PropTypes.object,
  skeleton: PropTypes.object,
  loadWalletInfo: PropTypes.func,
  setAssetLoading: PropTypes.func,
  getAssetGeneralInfo: PropTypes.func,
  getAssetHistory: PropTypes.func
};

const mapSateToProps = store => ({
  user: store.user.user,
  assets: store.assets,
  skeleton: store.skeleton
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadWalletInfo,
      setAssetLoading,
      getAssetGeneralInfo,
      getAssetHistory
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(Assets);
