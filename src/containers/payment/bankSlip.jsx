import React from "react";
import i18n from "../../utils/i18n";
import PropTypes from "prop-types";

import Dropdown from "../../components/dropdown";
import Instructions from "../../components/instructions";

import { Grid, Input, InputAdornment } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import colors from "../../components/bases/colors";
import style from "./style.css";

import { inputValidator } from "../../utils/inputValidator";

const customStyle = {
  inputRoot: {
    color: colors.messages.info,
    margin: "0.5rem 0",
    padding: '5px',
    width: 'calc(100% - 20px)',
    "&:hover:before": {
      borderBottomColor: colors.purple.dark,
    },
  },
  inputCss: {
    color: colors.messages.info,
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "14px",
    letterSpacing: "0.5px",
    textAlign: 'left',
    paddingLeft: '10px',
  },
  inputCssCenter: {
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "16px",
    letterSpacing: "0.5px",
    textAlign: 'center',
  },
  inputCssUnderline: {
    "&:before, &:after": {
      borderBottomColor: colors.purple.dark,
    },
    "&:hover:not($disabled):not($error):not($focused):before": {
      borderBottomColor: `${colors.purple.dark} !important`,
    },
  },
  inputCssUnderlineDisabled: {
    "&:before, &:after": {
      display: 'none',
    },
  },
  disabled: {},
  error: {},
  focused: {},
}


class BankSlip extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: [],
      bankSlip: {
        number: '',
        assignor: '',
        name: '',
        description: '',
        dueDate: '',
        cpfCnpj: '',
        value: '',
      },
      coin: {
        name: undefined,
        value: undefined,
        img: undefined
      },
      coins: [
        {
          title: 'Lunes',
          value: 'lunes',
          img: '/images/icons/coins/lunes.png'
        },
        {
          title: 'Bitcoin',
          value: 'btc',
          img: '/images/icons/coins/btc.png'
        },
        {
          title: 'Litecoin',
          value: 'ltc',
          img: '/images/icons/coins/ltc.png'
        },
      ],
    }

    this.coinSelected = this.coinSelected.bind(this);
  }

  coinSelected = (value, title, img = undefined) => {
    this.setState({
      ...this.state,
      coin: {
        name: title,
        value,
        img
      }
    })
  }

  handleBankSlipNumberChange = event => {
    this.setState({
      ...this.state,
      bankSlip: {
        ...this.state.bankSlip,
        number: event.target.value.replace(/\D/, '')
      }
    });


    if (event.target.value.length === 48) {
      alert('Valida o número do boleto');
    }
  }

  handleBankSlipDefaultChange = (name) => event => {
    this.setState({
      ...this.state,
      bankSlip: {
        ...this.state.bankSlip,
        [name]: event.target.value
      }
    });
  }

  inputValidator = () => {
    const {number, assignor, name, description, dueDate, cpfCnpj, value}  = this.state.bankSlip;

    const bankSlipInputs = {};

    for (const key in bankSlip) {
      if (bankSlip.hasOwnProperty(key)) {
        bankSlipInputs[key] = {
          type: "text",
          name: key,
          placeholder: key,
          value: bankSlip[key],
          required: true,
        };
      }
    }

    const { messageError, errors } = inputValidator(bankSlipInputs);

    if (errors) {
      this.setState({
        ...this.state,
        errors
      })
    }
  }

  render() {
    const {classes} = this.props;
    const {coins, coin, bankSlip, errors} = this.state;

    const title = coin.name || 'Select a coin..';
    const img = coin.img || '';

    return (
      <Grid container direction="row" justify="center">
        <Grid item xs={12} className={style.box}>
          <div className={style.row}>
            <Input
              classes={{
                root: classes.inputRoot,
                underline: classes.inputCssUnderline,
                input: classes.inputCssCenter
              }}
              placeholder="237933802350009031431630033330944400000001000000"
              inputProps={{ maxLength: 48, required: true }}
              value={bankSlip.number}
              onChange={this.handleBankSlipNumberChange}
            />
          </div>

          <Grid container>
            <Grid item xs={12} sm={6}>
              <Input
                error={errors.includes('assignor')}
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCss
                }}
                placeholder={i18n.t("PAYMENT_ASSIGNOR")}
                value={bankSlip.assignor}
                onChange={this.handleBankSlipDefaultChange('assignor')}
              />
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCss
                }}
                placeholder={i18n.t("PAYMENT_NAME")}
                value={bankSlip.name}
                onChange={this.handleBankSlipDefaultChange('name')}
              />
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCss
                }}
                placeholder={i18n.t("PAYMENT_SHORT_DESCRIPTION")}
                value={bankSlip.description}
                onChange={this.handleBankSlipDefaultChange('description')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCss
                }}
                placeholder={i18n.t("PAYMENT_DUE_DATE")}
                value={bankSlip.dueDate}
                onChange={this.handleBankSlipDefaultChange('dueDate')}
              />
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCss
                }}
                placeholder={i18n.t("PAYMENT_CPF_CNPJ")}
                value={bankSlip.cpfCnpj}
                onChange={this.handleBankSlipDefaultChange('cpfCnpj')}
              />
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCss
                }}
                placeholder={i18n.t("PAYMENT_VALUE")}
                startAdornment={
                  <InputAdornment position="start"
                    disableTypography
                    classes={{root: classes.inputCss}}
                  >
                    {i18n.t("PAYMENT_VALUE_SYMBOL")}
                  </InputAdornment>
                }
                value={bankSlip.value}
                onChange={this.handleBankSlipDefaultChange('value')}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} className={style.box} style={{marginTop: '10px'}}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Dropdown list={coins} title={title} titleImg={img} selectItem={this.coinSelected} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} className={style.transparentBox} style={{marginTop: '10px'}}>
          <button
            className={style.buttonBorderGreen}
            onClick={this.inputValidator}
          >
            {i18n.t("PAYMENT_PAY_NOW")}
          </button>
        </Grid>

        <Grid item xs={12} className={style.transparentBox} style={{marginTop: '10px'}}>
          <Instructions>
            {/* TODO: set the modal content */}
            <p>Conteúdo</p>
          </Instructions>
        </Grid>
      </Grid>
    );
  }
}

BankSlip.propTypes = {
  classes: PropTypes.object
}

export default withStyles(customStyle)(BankSlip);
