import React from "react";
import PropTypes from "prop-types";

// STYLE
import style from "./style.css";
import colors from "../../../../components/bases/colors";

// MATERIAL
import { Grid, Input } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// UTILS
import i18n from "../../../../utils/i18n";
import { ChevronDownIcon } from "@material-ui/icons";
import Select from "../../../../components/select";

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
    textAlign: "left"
  },
  inputCssCenter: {
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "12px",
    letterSpacing: "0.5px",
    textAlign: "left"
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
  focused: {},
  select: {
    width: "100%",
    "&:hover": {
      backgroundColor: "trasparent"
    },
    "&:before": {
      borderColor: "red"
    },
    "&:after": {
      borderColor: "yellow"
    }
  },
  icon: {
    fill: "blue"
  }
};

class InformationModal extends React.Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      personalNumber1: "",
      personalNumber2: "",
      personalNumber3: "",
      personalNumber4: "",
      city: "",
      state: "",
      cep: "",
      address: "",
      addressNumber: ""
    };
  }
  checkAllInputs = () => {
    const {
      fullName,
      personalNumber1,
      personalNumber2,
      personalNumber3,
      personalNumber4,
      cep,
      address,
      addressNumber
    } = this.state;

    return (
      fullName &&
      personalNumber1 &&
      personalNumber1 &&
      personalNumber2 &&
      personalNumber3 &&
      personalNumber4 &&
      cep &&
      address &&
      addressNumber
    );
  };

  handleInput = property => e => {
    this.setState({
      [property]: e.target.value
    });
  };

  validateForm = () => {
    console.warn(this.state);
  };

  renderStates = () => {
    const states = [];
    return states;
  };

  render() {
    const { classes } = this.props;
    let list = [];
    return (
      <div>
        <Grid container justify="space-between" className={style.container}>
          <Grid container justify="center">
            <Grid item xs={12}>
              <p className={style.formGroup}>
                {i18n.t("DEPOSIT_INF_MODAL_TITLE")}
              </p>
            </Grid>
          </Grid>
          <Grid container direction="row" justify="center">
            <Grid item xs={12} sm={6}>
              <div className={style.textGreen}>
                {i18n.t("DEPOSIT_INF_MODAL_FULLNAME")}
              </div>
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCssCenter
                }}
                placeholder={i18n.t("DEPOSIT_INF_MODAL_FULLNAME")}
                value={this.state.fullName}
                onChange={this.handleInput("fullName")}
              />
            </Grid>
            <Grid item sm={1} />
            <Grid item xs={3} sm={1}>
              <div className={style.textGreen}>
                {i18n.t("DEPOSIT_INF_MODAL_PERSONAL_NUMBER")}
              </div>
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCssCenter
                }}
                placeholder={i18n.t("DEPOSIT_INF_MODAL_PERSONAL_NUMBER")}
                value={this.state.personalNumber1}
                onChange={this.handleInput("personalNumber1")}
              />
            </Grid>
            <Grid item xs={3} sm={1}>
              <div className={style.personalNumber}>
                {i18n.t("DEPOSIT_INF_MODAL_PERSONAL_NUMBER")}
              </div>
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCssCenter
                }}
                placeholder={i18n.t("DEPOSIT_INF_MODAL_PERSONAL_NUMBER")}
                value={this.state.personalNumber2}
                onChange={this.handleInput("personalNumber2")}
              />
            </Grid>
            <Grid item xs={3} sm={1}>
              <div className={style.personalNumber}>
                {i18n.t("DEPOSIT_INF_MODAL_PERSONAL_NUMBER")}
              </div>
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCssCenter
                }}
                placeholder={i18n.t("DEPOSIT_INF_MODAL_PERSONAL_NUMBER")}
                value={this.state.personalNumber3}
                onChange={this.handleInput("personalNumber3")}
              />
            </Grid>
            <Grid item xs={3} sm={1}>
              <div className={style.personalNumber}>
                {i18n.t("DEPOSIT_INF_MODAL_PERSONAL_NUMBER")}
              </div>
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCssCenter
                }}
                placeholder={i18n.t("DEPOSIT_INF_MODAL_PERSONAL_NUMBER")}
                value={this.state.personalNumber4}
                onChange={this.handleInput("personalNumber4")}
              />
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justify="center"
            className={style.formGroup}
          >
            <Grid item xs={5}>
              <div className={style.textGreen}>
                {i18n.t("DEPOSIT_INF_MODAL_STATE")}
              </div>
              <Select width={"100%"} list={list} />
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={5}>
              <div className={style.textGreen}>
                {i18n.t("DEPOSIT_INF_MODAL_CITY")}
              </div>
              <Select width={"100%"} list={list} />
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justify="center"
            className={style.formGroup}
          >
            <Grid item xs={12} sm={5}>
              <div className={style.textGreen}>
                {i18n.t("DEPOSIT_INF_MODAL_ADDRESS")}
              </div>
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCssCenter
                }}
                placeholder={i18n.t("DEPOSIT_INF_MODAL_ADDRESS")}
                value={this.state.address}
                onChange={this.handleInput("address")}
              />
            </Grid>
            <Grid item sm={1} />
            <Grid item xs={6} sm={2}>
              <div className={style.textGreen}>
                {i18n.t("DEPOSIT_INF_MODAL_CEP")}
              </div>
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCssCenter
                }}
                placeholder={i18n.t("DEPOSIT_INF_MODAL_CEP")}
                value={this.state.cep}
                onChange={this.handleInput("cep")}
              />
            </Grid>
            <Grid item sm={1} />
            <Grid item xs={6} sm={2}>
              <div className={style.textGreen}>
                {i18n.t("DEPOSIT_INF_MODAL_ADDRESS_NUMBER")}
              </div>

              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCssCenter
                }}
                placeholder={i18n.t("DEPOSIT_INF_MODAL_ADDRESS_NUMBER")}
                value={this.state.addressNumber}
                onChange={this.handleInput("addressNumber")}
              />
            </Grid>
          </Grid>

          <Grid container justify="center">
            <Grid item xs={5}>
              <button
                className={
                  this.checkAllInputs()
                    ? style.buttonEnable
                    : style.buttonBorderGreen
                }
                onClick={this.checkAllInputs() ? this.validateForm : null}
              >
                {i18n.t("DEPOSIT_INF_MODAL_BTN_CONTINUE")}
              </button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

InformationModal.propTypes = {
  classes: PropTypes.object
};

export default withStyles(customStyle)(InformationModal);
