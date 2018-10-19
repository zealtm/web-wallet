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

class History extends React.Component {
  componentDidMount() {
    let { getHistoryBuy } = this.props
    console.warn('>>>>>>>>>>>im gonna call him', getHistoryBuy)
    // Array.from(['btc','lunes','usdt','dash','bch','eth']).map(coin => {
    // })
    getHistoryBuy()
  }
  renderHistory = () => {
    // return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((val, index) => {
    //   return (
    //     <HistoryCard key={index} />
    //   )
    // })
    let { history, loadingHistory } = this.props.buy;
    if (loadingHistory)
      return <Loading/>
    return history.map((tx, key) => <HistoryCard {...tx} key={key}/>)
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
  getHistoryBuy: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  buy: state.buy
})
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getHistoryBuy
  }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(History)
