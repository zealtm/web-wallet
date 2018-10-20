import React from "react";
import PropTypes from "prop-types";

// COMPONENTS
import HistoryCard from "../historyCard";
import Loading from "../../../../components/loading.jsx"

// STYLE
import style from "./style.css";

import { Grid } from "@material-ui/core";

//REDUX
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// import axios from 'axios'
// import { getAuthToken } from '../../../../utils/localStorage.js'
import { getHistoryBuy } from '../../redux/buyAction'
import i18n from '../../../../utils/i18n.js'

class History extends React.Component {
  componentDidMount() {
    let { getHistoryBuy, coins } = this.props
    getHistoryBuy(coins)
  }
  removeDuplicatedData = (data) => {
    let newData = []
    let ids = []
    data.map((tx) => {
      if (ids.indexOf(tx.id) === -1) {
        newData.push(tx)
        ids.push(tx.id)
      }
    })
    return newData
  }
  orderByTime = (data) => data.sort((a,b) => {
    a = {timestamp: new Date(a.date).getTime()}
    b = {timestamp: new Date(b.date).getTime()}
    if (a.timestamp < b.timestamp) return -1;
    if (a.timestamp > b.timestamp) return 1;
    return 0;
  })
  renderHistory = () => {
    let { user } = this.props
    let { history, loadingHistory } = this.props.buy;
    if (loadingHistory)
      return <Loading/>

    if (!history)
      return <h1 className={style.textCenter}>{i18n.t("BUYCOINS_FAILED_TO_GET_HISTORY")}</h1>
    if (history.constructor.name !== 'Array')
      return <h1 className={style.textCenter}>{i18n.t("BUYCOINS_NO_HISTORY")}</h1>
    if (history.length < 1)
      return <h1 className={style.textCenter}>{i18n.t("BUYCOINS_NO_HISTORY")}</h1>

    history = this.removeDuplicatedData(history)
    history = this.orderByTime(history)
    return history.map((tx, key) => <HistoryCard user={user} {...tx} key={key}/>)
  }

  render() {
    return (
      <Grid container direction="row" justify="center">
        <Grid item xs={12} md={6} className={style.box}>
          <div className={style.boxContainer}>
            {this.renderHistory()}
          </div>
        </Grid>
      </Grid>
    )
  }
}

History.propTypes = {
  getHistoryBuy: PropTypes.func.isRequired,
  buy: PropTypes.object.isRequired,
  coins: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  buy: state.buy,
  coins: state.skeleton.coins,
  user: state.user.user
})
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getHistoryBuy
  }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(History)
