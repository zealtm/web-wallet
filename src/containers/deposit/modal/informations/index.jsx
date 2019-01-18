import React from "react";

// STYLE
import style from "./style.css";
import colors from "../../../../components/bases/colors";

// MATERIAL
import { Grid, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// UTILS
import i18n from "../../../../utils/i18n";

const customStyle = {
  inputRoot: {
    color: colors.messages.info,
    margin: "0.5rem 0",
    padding: "5px",
    width: "calc(100% - 20px)",
    "&:hover:before": {
      borderBottomColor: colors.purple.dark
    }
  },
  inputCss: {
    color: colors.messages.info,
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "14px",
    letterSpacing: "0.5px",
    textAlign: "left",
    paddingLeft: "10px"
  },
  inputCssCenter: {
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "12px",
    letterSpacing: "0.5px",
    textAlign: "center"
  },
  inputCssUnderline: {
    "&:before, &:after": {
      borderBottomColor: colors.purple.dark
    },
    "&:hover:not($disabled):not($error):not($focused):before": {
      borderBottomColor: `${colors.purple.dark} !important`
    }
  },
  inputCssUnderlineDisabled: {
    "&:before, &:after": {
      display: "none"
    }
  },
  disabled: {},
  error: {},
  focused: {}
};

class InformationModal extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
  }

  handleInput = () => {
    console.log(this.state.name);
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={style.information}>
      <h1>MODAL</h1>
      </div>
    );
  }
}

export default withStyles(customStyle)(InformationModal);
