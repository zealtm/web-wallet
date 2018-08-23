import React from "react"
import i18n from "../../utils/i18n";

import { Grid, Input, InputLabel, FormControl } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import style from "./style.css";
import colors from "../../components/bases/colors";

const inputStyle = {
  root: {
    color: colors.messages.info,
    margin: "1rem 0",
    fontFamily: "Noto Sans, sans-serif",
    color: colors.messages.info,
    fontSize: "17px",
    letterSpacing: "0.5px",
    "&:hover:before": {
      borderBottomColor: colors.purple.dark,
    },
  },
  cssUnderline: {
    "&:before, &:after": {
      borderBottomColor: colors.purple.dark,
    },
    "&:hover:not(&$disabled):not(&$error):not(&$focused):before": {
      borderBottomColor: colors.purple.dark,
    },
    disabled: {},
    error: {},
    focused: {},
  },
}

class Voucher extends React.Component {
  constructor() {
    super();

    this.state = {
      phone: '',
      code0: '',
      code1: '',
      code2: '',
      code3: '',
    }
  }

  handleChange = name => event => {
    console.log(name, event.target.value);
    this.setState({
      ...this.state,
      [name]: event.target.value
    });
  }

  renderCodeInputs = () => {
    return (
      [...Array(4).keys()].map((id) => {
        return (
          <Grid key={id} item xs={6} sm={3}>
            <input key={id} className={style.inputTextDefault} placeholder="1234" onChange={this.handleChange(`code${id}`)}/>
          </Grid>
        );
      })
    )
  }

  render() {
    const { classes } = this.props;
    const { phone } = this.state;

    return (
      <Grid container>
        {/* TODO: remove after have the offset option to the Grid component */}
        <Grid item xs={false} sm={3}></Grid>
        <Grid item xs={12} sm={6}>
          <div className={style.wrap}>
            <label className={style.inputLabel} htmlFor="txtPhone">{i18n.t("VOUCHER_NUMBER")}</label>
            <div className="wrapInput">
              <Input id="txtPhone"
                classes={{ root: classes.root, underline: classes.cssUnderline }}
                className={style.defaultText}
                placeholder="(xx) xxxxx-xxxx"
                value={phone}
                onChange={this.handleChange('phone')}
                fullWidth
              />
            </div>
          </div>

          <div className={style.wrap}>
            <label>{i18n.t("VOUCHER_CODE")}</label>
            <Grid container>
              {this.renderCodeInputs()}
            </Grid>
          </div>

          <div className={style.wrap}>
            <button
              className={style.buttonBorderGreen}
              onClick={() => console.log(this.state)}
            >
              {i18n.t("VOUCHER_BUTTON")}
            </button>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(inputStyle)(Voucher);
