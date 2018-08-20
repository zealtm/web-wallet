import React, { Component } from "react";
import QrReader from "react-qr-reader";
import PropTypes from "prop-types";

class BoxQrReader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            delay: 300,
            result: 'No result',
        }
    }

    handleScan = (data) => {
        let { action } = this.props;

        if (!data) {
            this.setState({ result: data });
            action();
        }
    }

    handleError = (error) => {
        error ? this.setState({ result: error.message }) : null
    }

    render() {
        let { result } = this.state;
        return (
            <div>
                <QrReader
                    delay={this.state.delay}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: '100%' }}
                />
                <p>{result}</p>
            </div>
        )
    }
}

BoxQrReader.propTypes = {
    action: PropTypes.func
};

export default BoxQrReader;