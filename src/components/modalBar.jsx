import React, { Component } from "react";

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
    backgroundColor: '#FFF'
  }
}

let showModal = true;

class ModalBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: undefined,
      message: undefined
    };
  }

  componentDidMount() {
    this.validateContente();
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
          className={style.info}
          open={showModal}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <SnackbarContent
            message={
              <span id="client-snackbar">
                {this.state.message}
                <CloseIcon />
              </span>
            }
          />
        </Snackbar>
      </div>
    );
  }
}

export default ModalBar;
