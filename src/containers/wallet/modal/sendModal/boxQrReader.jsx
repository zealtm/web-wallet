import React, { Component } from "react";
import QrReader from "react-qr-reader";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getValidateAddress,
  setWalletSendModalLoading
} from "../../redux/walletAction";
import { errorInput } from "../../../errors/redux/errorAction";

class BoxQrReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 300,
      result: ""
    };
  }

  handleScan = data => {
    let { coin, getValidateAddress, setWalletSendModalLoading } = this.props;
    if (data) {
      setWalletSendModalLoading();
      getValidateAddress(coin, data);
    }
  };

  handleError = error => {
    let { errorInput } = this.props;
    errorInput(error.message);
  };

  render() {
    let { result, delay } = this.state;
    return (
      <div>
        <QrReader
          delay={delay}
          onError={this.handleError}
          onScan={this.handleScan}
        />
        <p>{result}</p>
      </div>
    );
  }
}

BoxQrReader.propTypes = {
  coin: PropTypes.string.isRequired,
  getValidateAddress: PropTypes.func.isRequired,
  setWalletSendModalLoading: PropTypes.func.isRequired,
  errorInput: PropTypes.func
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      errorInput,
      getValidateAddress,
      setWalletSendModalLoading
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(BoxQrReader);
