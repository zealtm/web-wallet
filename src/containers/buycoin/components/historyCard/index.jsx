import React from "react";

// COMPONENTS
import { Grid } from "@material-ui/core";

// STYLE
import style from "./style.css";

//UTILS
import {
  convertISO8601,
  convertBiggestCoinUnit ,
  convertSmallerCoinUnit
} from "../../../../utils/numbers.js";
import i18n from '../../../../utils/i18n.js'

class HistoryCard extends React.Component {
  constructor(props) {
    super(props)
    this.convert(props)
  }
  convertFiat = (val) => {
    //TODO I think this service is available just here for now, isnt it ?
    return val.toLocaleString('pt-BR', {
      style: 'currency', currency: 'BRL'
    })
  }
  convertStatus = (status) => {
    return i18n.t(`BUYCOINS_STATUS_${status.toUpperCase()}`)
  }
  convertAmount = (amount) => {
    return convertBiggestCoinUnit(amount, 8)
  }
  capitalCase = (val) => {
    let f = val.charAt(0).toUpperCase()
    let rest = val.substr(1,90)
    return f + rest
  }
  convert = (data) => {
    try {
      let { coin, status, amount, fiatAmount, date } = data
      date = convertISO8601(date)
      this.state = { //eslint-disable-line
        upCoin: coin.toUpperCase(),
        downCoin: coin.toLowerCase(),
        capitalCoin: this.capitalCase(coin),
        fiatAmount,
        convertedFiat: this.convertFiat(fiatAmount),
        iso8601Date: date,
        icon: `/images/icons/coins/${coin.toLowerCase()}.png`,
        hour: date.hour,
        date: date.date,
        status,
        convertedStatus: this.convertStatus(status),
        amount,
        satoshiAmount: convertBiggestCoinUnit(amount, 8),
        commonAmount: convertSmallerCoinUnit(amount, 8),
        id: 'NAO VEIO' //TODO pay attention
      }
    } catch (err) {
      console.error(err)
      return undefined
    }
  }
  render() {
    let obj = this.state
    return (
      <div>
        <Grid container className={style.maginText}>

          <Grid item xs={8}>

            <Grid direction="row" className={style.maginText}>
              <span className={style.bold}>{obj.date} {obj.hour}</span>
              <span className={style.status}>{obj.convertedStatus}</span>
            </Grid>

            <Grid direction="row" className={style.maginText}>
              <span className={style.text}>Crédito</span>
            </Grid>

            <Grid direction="row" className={style.maginText}>
              <span className={style.text}>ID - {obj.id}</span>
            </Grid>

          </Grid>

          <Grid item xs={4}>

            <Grid direction="row" className={`${style.maginTextRight} ${style.wrapper1}`}>
              <img src={obj.icon} className={style.icon} /><span className={style.img}>{obj.upCoin}</span>
            </Grid>

            <Grid direction="row" className={style.maginTextRight}>
              <span className={style.lunes}>{obj.satoshiAmount} {obj.upCoin}</span>
            </Grid>

            <Grid direction="row" className={style.maginTextRight}>
              <span className={style.text}>{obj.convertedFiat}</span>
            </Grid>
          </Grid>
        </Grid>
        <div className={style.line} />
      </div>
    )
  }
}

HistoryCard.propTypes = {

};

export default HistoryCard;
