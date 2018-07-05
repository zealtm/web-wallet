import React, { Component } from "react";
import PropTypes from "prop-types";

// MATERIAL UI
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

// IMAGES
const imagePath = "/images/modal/";

const style = {
  info: {
    backgroundColor: "#ffffff"
  },
  error: {
    backgroundColor: "#ff445b"
  },
  success: {
    backgroundColor: "#4cd566"
  },
  modalContent: {
    alignItems: "center",
    display: "flex"
  },
  typeIcon: {
    color: "#000000",
  },
  message: {
    color: "#000000",
    fontSize: "17px",
    opacity: "0.4",
    margin: "0 50px 0 20px"
  },
  closeIcon: {
    color: "#000000",
    fontSize: "24px",
    opacity: "0.54",
    float: "right"
  }
};

class ModalBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      type: undefined,
      message: undefined
    };
  }

  componentDidMount() {
    this.validateContente();
  }

  modalControl() {
    this.setState(...this.state, { show: false });
  }

  validateContente = () => {
    let { type, message } = this.props;
    if (!type) type = "info";
    if (!message) message = "NO TEXT MESSAGE";
    this.setState({ type, message });
  };

  render() {
    const { classes } = this.props;
    const { type, message } = this.state;
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
            className={classes[type]}
            message={
              <div className={classes.modalContent}>
                <img
                  className={classes.typeIcon}
                  src={imagePath + "/" + type + ".png"}
                />
                <span className={classes.message}>{message}</span>
                <CloseIcon
                  className={classes.closeIcon}
                  onClick={() => {
                    this.modalControl();
                  }}
                />
              </div>
            }
          />
        </Snackbar>
      </div>
    );
  }
}

ModalBar.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.oneOf(["success", "error", "info"]).isRequired,
  message: PropTypes.string
};

export default withStyles(style)(ModalBar);
