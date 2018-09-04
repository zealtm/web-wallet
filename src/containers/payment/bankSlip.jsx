import React from "react";
import i18n from "../../utils/i18n";
import PropTypes from "prop-types";

import Dropdown from "../../components/dropdown";
import Instructions from "../../components/instructions";

import { Grid, Input } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import colors from "../../components/bases/colors";
import style from "./style.css";

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

  render() {
    const {classes} = this.props;
    const {coins, coin} = this.state;

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
              placeholder="23793380235000903143163003333094440000000100000"
            />
          </div>

          <Grid container>
            <Grid item xs={12} sm={6}>
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCss
                }}
                placeholder={i18n.t("PAYMENT_BANK")}
              />
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCss
                }}
                placeholder={i18n.t("PAYMENT_NAME")}
              />
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCss
                }}
                placeholder={i18n.t("PAYMENT_SHORT_DESRIPTION")}
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
              />
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCss
                }}
                placeholder={i18n.t("PAYMENT_CPF_CNPJ")}
              />
              <Input
                classes={{
                  root: classes.inputRoot,
                  underline: classes.inputCssUnderline,
                  input: classes.inputCss
                }}
                placeholder={i18n.t("PAYMENT_VALUE")}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} className={style.box} style={{marginTop: '10px'}}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Dropdown list={coins} title={title} titleImg={img} selectItem={this.coinSelected} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <div className={style.coinValue}>
                0
              </div>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} className={style.transparentBox} style={{marginTop: '10px'}}>
          <button className={style.buttonBorderGreen}>
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
