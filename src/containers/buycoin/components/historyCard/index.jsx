import React from "react";
import PropTypes from "prop-types";

// COMPONENTS 
import {Grid} from "@material-ui/core";

// STYLE 
import style from "./style.css";

class HistoryCard extends React.Component {
  render(){
    return(
      <div>
        <h3>Nome do Usuario Aqui</h3>
        <Grid container>
          <Grid item xs={8}>
            <span>22/12/2018 17:30</span>
            <span>Confirmado</span>
            <br />
            Credito 
            <br />
            ID - 12345678
          </Grid>
          <Grid item xs={4}>
            <img src="" /> Lunes
            <span>0.12345678</span>
            R$ 0,00
          </Grid>
        </Grid>
      </div>
    )
  }
}

HistoryCard.propTypes = {

};

export default HistoryCard;