import React from "react";
import PropTypes from "prop-types";

// UTILS
import i18n from "../../../utils/i18n";

// MATERIAL 
import Grid from "@material-ui/core/Grid";

// STYLE 
import style from "./style.css";

class WalletRow extends React.Component {
  
  renderButtonFav(fav){    
    if(fav){
      return (
        <button onClick={() => alert(1)} className={style.buttonDanger}>
          {i18n.t("SET_BUTTON_REMOVE")}
        </button> 
      )
    }else{
      return (
        <button onClick={() => alert(2)} className={style.buttonPurple}>
          {i18n.t("SET_BUTTON_FAV")}
        </button> 
      )
    }
  }

  render(){
    const {coin} = this.props;
    return (
      <Grid container justify="center">
        <Grid item xs={2} md={1}>
          <img src={`images/icons/coins/${coin.name}.png`} className={style.coinIcon} />
        </Grid>
        <Grid item xs={7} md={8}>
          <input type="text" placeholder={`Wallet ${coin.name}`} className={style.inputClear} />
        </Grid>
        <Grid item xs={3} md={2}>
          {this.renderButtonFav(coin.favorite)}
        </Grid>
      </Grid>
    )
  }
}

WalletRow.propTypes = {
  coin: PropTypes.object.isRequired
};

export default WalletRow;