import React, { Component } from 'react';
import QrReader from 'react-qr-reader';

class BoxQrReader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            delay: 300,
            result: 'No result',
        }
    }

    handleScan = (data) => {
        data ? this.setState({ result: data }) : null
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
};

export default BoxQrReader;