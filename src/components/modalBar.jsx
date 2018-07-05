import React, { Component } from "react";
import Immutable from "seamless-immutable";

// MATERIAL UI
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";

const style = {
  info: {
    backgroundColor: "#FFF"
  }
};


class ModalBar extends Component {
  constructor(props) {
    super(props);
    this.state = Immutable({
      show: true,
      type: undefined,
      message: undefined
    });
  }

  componentDidMount() {
    this.validateContente();
  }

  modalControl() {
    this.setState(Immutable.merge(this.state, { show: false }));
  }

  validateContente = () => {
    let { type, message } = this.props;
    if (!type) type = "info";
    if (!message) message = "NO TEXT MESSAGE";
    this.setState({ type, message });
  };

  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={this.state.show}
        >
          <SnackbarContent
            message={
              <span id="client-snackbar">
                {this.state.message}
                <CloseIcon onClick={this.modalControl()}/>
              </span>
            }
          />
        </Snackbar>
      </div>
    );
  }
}

export default ModalBar;
