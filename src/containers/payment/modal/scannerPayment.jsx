import React from "react";
import PropTypes from "prop-types";
import * as Quagga from "quagga";
import * as bb from "brazilian-barcode";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalStep } from "../redux/paymentAction";

class ScannerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barcode: "Vazio"
    };
  }

  componentDidMount() {
    this.quaggaScript();
  }

  quaggaScript() {
    if (
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === "function"
    ) {
      // safely access `navigator.mediaDevices.getUserMedia`
    }
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          constraints: {
            width: 400,
            height: 100,
            facingMode: "environment" // or user to frontal camera
          }
        },
        locator: {
          patchSize: "large",
          halfSample: true
        },
        numOfWorkers: 2,
        decoder: {
          readers: ["code_128_reader", "i2of5_reader"]
        },
        locate: true
      },
      function(err) {
        if (err) {
          console.warn("err", err);
          return;
        }
        Quagga.start();
      }
    );
    Quagga.onDetected(this._onDetected.bind(this));
    Quagga.onProcessed(function(result) {
      const drawingCtx = Quagga.canvas.ctx.overlay;
      const drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            parseInt(drawingCanvas.getAttribute("width")),
            parseInt(drawingCanvas.getAttribute("height"))
          );
          result.boxes
            .filter(box => box !== result.box)
            .forEach(box => {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: "green",
                lineWidth: 2
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: "#00F",
            lineWidth: 2
          });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: "x", y: "y" },
            drawingCtx,
            { color: "red", lineWidth: 3 }
          );
        }
      }
    });
  }

  componentWillUnmount() {
    Quagga.offDetected(this._onDetected.bind(this));
  }

  _onDetected(result) {
    const { scannerModal } = this.props;
    console.warn("result", result);
    const barcode = bb.digit.getVDBank(result, true);
    console.warn("Barcode: ", barcode);
    this.setState({ barcode });
    scannerModal();

    return;
  }

  render() {
    return (
      <div id="interactive" className="viewport">
        <video
          className="videoCamera"
          autoPlay={true}
          preload="auto"
          src=""
          muted={true}
          playsInline={true}
        />
        <canvas
          className="drawingBuffer"
          style={{
            position: "absolute",
            top: 0,
            left: 0
          }}
        />
        Barcode: {this.state.barcode}
      </div>
    );
  }
}

ScannerModal.propTypes = {
  loading: PropTypes.bool.isRequired,
  scannerModal: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  modalStep: store.payment.modalStep,
  loading: store.payment.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setModalStep
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScannerModal);
