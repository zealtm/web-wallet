import React from "react";
import PropTypes from "prop-types"

// REDUX
import { connect } from "react-redux";

// COMPONENTS
import { Grid } from "@material-ui/core";

// STYLE
import style from "./style.css";

//UTILS
import {
  convertISO8601,
  convertBiggestCoinUnit,
  satoshiToCommon,
  localCurrency
} from "../../../../utils/numbers.js";
import i18n from '../../../../utils/i18n.js'

class HistoryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount = () => {
    const {obj} = this.props;
    this.convert(obj);
  }

  convertFiat = (val) => {
    let { user } = this.props;
    user.country = user.country ? user.country.replace(/\s/gmi, '_').toLowerCase() : undefined;
    let currency;

    if (user.country === 'brazil') {
      currency = 'BRL';
      val = val.BRL;
    } else {
      currency = 'USD';
      val = val.USD;
    }

    return localCurrency(val, currency);
  }

  convertStatus = (status) => {
    return i18n.t(`BUYCOINS_STATUS_${status.toUpperCase()}`);
  }

  capitalCase = (val) => {
    let f = val.charAt(0).toUpperCase();
    let rest = val.substr(1);
    return f + rest;
  }

  convert = (data) => {
    let { coin, status, amount, fiatAmount, date, id } = data;
    const {decimalPoint} = this.props.coins[coin];
  
    try { 
      date = convertISO8601(date);
      this.setState({
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
        satoshiAmount: amount,
        commonAmount: satoshiToCommon(amount, decimalPoint),
        id: id || 'Unknown',
      });

    } catch (err) {
      return;
    }
  }

  render() {
    let obj = this.state;

    return (
      <div>
        <Grid container className={style.maginText}>
          <Grid item xs={8}>
            <Grid direction="row" className={style.maginText}>
              <span className={style.bold}>{obj.date} {obj.hour}</span>
              <span className={style.status}>{obj.convertedStatus}</span>
            </Grid>

            <Grid direction="row" className={style.maginText}>
              <span className={style.text}>{i18n.t("BUY_CREDIT")}</span>
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
              <span className={style.lunes}>{obj.commonAmount.toFixed(8)} {obj.upCoin}</span>
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
  user: PropTypes.object.isRequired, 
  obj: PropTypes.object.isRequired,
  coins: PropTypes.array.isRequired
};


const mapStateToProps = store => ({
  coins: store.skeleton.coins
});

export default connect(
  mapStateToProps,
  null
)(HistoryCard);