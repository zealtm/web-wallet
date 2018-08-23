import React from "react"
import i18n from "../../utils/i18n";

import { Grid, Input } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import style from "./style.css";
import colors from "../../components/bases/colors";

import Code from './code'

import { inputValidator } from "../../utils/inputValidator";

const inputStyle = {
  root: {
    color: colors.messages.info,
    margin: "1rem 0",
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
    "&:hover:not(&$disabled):not(&$error):not(&$focused):before": {
      borderBottomColor: colors.purple.dark,
    },
  },
  marginGrid: {
    marginTop: '2rem'
  }
}

class Voucher extends React.Component {
  constructor() {
    super();

    this.state = {
      phone: ['',''],
      code: ['','','',''],
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
    const {phone, code} = this.state;

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

    let { messageError, errors } = inputValidator({phone: phoneInput, code: codeInput});

    console.log('errorMessage', messageError, 'errors', errors);
  }

  render() {
    const { classes } = this.props;
    const { phone, code } = this.state;

    return (
      <Grid container>
        {/* TODO: remove after have the offset option to the Grid component */}
        <Grid item xs={false} sm={3}></Grid>
        <Grid item xs={12} sm={6}>
          <div className={style.wrap}>
            <label className={style.inputLabel} htmlFor="txtPhone">{i18n.t("VOUCHER_NUMBER")}</label>
            <Grid container>
              <Grid item xs={4}>
                <Input
                  classes={{ root: classes.root, underline: classes.cssUnderline, input: classes.cssInput }}
                  placeholder="(xx)"
                  value={phone[0]}
                  inputProps={{maxLength: 2, required: true}}
                  onChange={this.handlePhoneChange(0)}
                />
              </Grid>
              <Grid item xs={8}>
                <Input
                  classes={{ root: classes.root, underline: classes.cssUnderline, input: classes.cssInput }}
                  placeholder="xxxxx-xxxx"
                  value={phone[1]}
                  inputProps={{maxLength: 9, required: true}}
                  onChange={this.handlePhoneChange(1)}
                />
              </Grid>
            </Grid>
          </div>

          <div className={style.wrap}>
            <label className={style.marginLabel}>{i18n.t("VOUCHER_CODE")}</label>
            <Code values={code} onHandleChange={this.handleCodeChange} />
          </div>

          <div className={style.wrap}></div>

          <div className={style.wrap}>
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

export default withStyles(inputStyle)(Voucher);
