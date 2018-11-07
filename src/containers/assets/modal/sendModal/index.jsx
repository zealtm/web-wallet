import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setAssetModalStep } from "../../redux/assetsAction";

// COMPONENTS
import BoxAddress from "./boxAddress";
import BoxAmount from "./boxAmount";
import BoxFee from "./boxFee";
import BoxConfirm from "./boxConfirm";
import BoxResult from "./boxResult";
import BoxResultError from "./boxResultError";

// STYLE
import style from "../../style.css";

class SendModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
    };
  }

  renderContent = () => {
    let { modal, asset } = this.props;
    if (modal.step === 0) return <BoxAddress coin={asset.selectedCoin} />;
    if (modal.step === 1) return <BoxAmount coin={asset.selectedCoin} />;
    if (modal.step === 2) return <BoxFee coin={asset.selectedCoin} />;
    if (modal.step === 3) return <BoxConfirm coin={asset.selectedCoin} />;
    if (modal.step === 4) return <BoxResult coin={asset.selectedCoin} />;
    if (modal.step === 5) return <BoxResultError coin={asset.selectedCoin} />;
  };

  render() {
    return <div className={style.baseStep}>{this.renderContent()}</div>;
  }
}

SendModal.propTypes = {
  modal: PropTypes.object.isRequired,
  asset: PropTypes.object.isRequired,
  assets: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  setAssetModalStep: PropTypes.func.isRequired
};

const mapSateToProps = store => ({
  asset: store.asset,
  modal: store.asset.modal,
  assets: store.asset.assets
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setAssetModalStep
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(SendModal);
