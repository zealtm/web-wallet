import React from "react";
import PropTypes from "prop-types";

// COMPONENTS 
import HistoryCard from "../historyCard";

// STYLE 
import style from "./style.css";

import { Grid } from "@material-ui/core";

class History extends React.Component {

  renderHistory = () => {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((val, index) => {
      return (
        <HistoryCard key={index} />
      )
    })
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

};

export default History;