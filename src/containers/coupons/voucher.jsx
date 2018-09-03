import React from "react"
import i18n from "../../utils/i18n";
import PropTypes from "prop-types";
import { Grid, Input } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import style from "./style.css";
import colors from "../../components/bases/colors";

import Code from './code';
import Instructions from "./instructions";

import { inputValidator } from "../../utils/inputValidator";

const inputStyle = {
  root: {
    color: colors.messages.info,
    margin: "0",
    padding: '5px',
    width: 'calc(100% - 20px)',
    "&:hover:before": {
      borderBottomColor: colors.purple.dark,
    },
  },
  cssInput: {
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "17px",
    letterSpacing: "0.5px",
    textAlign: 'center',
  },
  cssUnderline: {
    "&:before, &:after": {
      borderBottomColor: colors.purple.dark,
    },
    "&:hover:not($disabled):not($error):not($focused):before": {
      borderBottomColor: `${colors.purple.dark} !important`,
    },
  },
  disabled: {},
  error: {},
  focused: {},
}

class Voucher extends React.Component {
  constructor() {
    super();

    this.state = {
      phone: ['', ''],
      code: ['', '', '', ''],
      errors: undefined
    }

    this.handleCodeChange = this.handleCodeChange.bind(this);
  }

  handlePhoneChange = (id) => event => {
    const phone = this.state.phone;
    phone[id] = event.target.value;

    this.setState({
      ...this.state,
      phone
    });
  }

  handleCodeChange = (id, value) => {
    const code = this.state.code;
    code[id] = value;

    this.setState({
      ...this.state,
      code
    });
  }

  inputValidator = () => {
    const { phone, code } = this.state;

    const phoneInput = {
      type: "text",
      name: "phone",
      placeholder: "Phone",
      value: phone.join('').replace(/\D/, ''),
      required: true,
      minLength: 11,
      maxLength: 11,
    }

    const codeInput = {
      type: "text",
      name: "code",
      placeholder: "Code",
      value: code.join('').replace(/\D/, ''),
      required: true,
      minLength: 16,
      maxLength: 16,
    }

    inputValidator({ phone: phoneInput, code: codeInput });
  }

  render() {
    const { classes } = this.props;
    const { phone, code } = this.state;

    return (
      <Grid container
        direction="row"
        justify="center"
      >
        <Grid item
          xs={12}
          className={style.box}
        >
          <div className={style.row}>
            <label htmlFor="txtPhone">{i18n.t("VOUCHER_NUMBER")}</label>
            <Grid container>
              <Grid item xs={4}>
                <Input
                  classes={{
                    root: classes.root,
                    underline: classes.cssUnderline,
                    input: classes.cssInput
                  }}
                  placeholder="(xx)"
                  value={phone[0]}
                  inputProps={{ maxLength: 2, required: true }}
                  onChange={this.handlePhoneChange(0)}
                />
              </Grid>
              <Grid item xs={8}>
                <Input
                  classes={{
                    root: classes.root,
                    underline: classes.cssUnderline,
                    input: classes.cssInput
                  }}
                  placeholder="xxxxx-xxxx"
                  value={phone[1]}
                  inputProps={{ maxLength: 9, required: true }}
                  onChange={this.handlePhoneChange(1)}
                />
              </Grid>
            </Grid>
          </div>

          <div className={style.row}>
            <label className={style.marginLabel}>{i18n.t("VOUCHER_CODE")}</label>
            <Code values={code} onHandleChange={this.handleCodeChange} />
          </div>

          <div className={style.row}>
            <Instructions />
          </div>

          <div className={style.row}>
            <button
              className={style.buttonBorderGreen}
              onClick={() => this.inputValidator()}
            >
              {i18n.t("VOUCHER_BUTTON")}
            </button>
          </div>
        </Grid>
      </Grid>
    );
  }
}


Voucher.propTypes = {
  classes: PropTypes.object
}

export default withStyles(inputStyle)(Voucher);
