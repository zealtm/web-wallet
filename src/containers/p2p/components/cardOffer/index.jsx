import React from "react";
import PropTypes from "prop-types";

// MATERIAL 
import {Grid,Avatar} from "@material-ui/core/";
import {ArrowForward} from "@material-ui/icons/";

// STYLE
import style from "./style.css";

class CardOffer extends React.Component {
  constructor(props){
    super(props);
  }

  
  render(){
    return (

      <div className={style.baseUser}>
        <Grid container>
          <Grid item xs={2}>
            <Avatar alt="avatar" src="https://loremflickr.com/40/40" className={style.avatar} />
          </Grid>
          <Grid item xs={5}>
            <span className={style.name}>Nome Usuario</span>
            <span className={style.textSmall}>00/00/2018</span>
            <span className={style.numberText}>20.00000000</span>
            <span className={style.textSmall}>Oferta</span>
            <span>select_aqui</span>
          </Grid>
          <Grid item xs={5}>
            <span>stars_aqui</span>
            <span className={style.textSmall}>Unid. R$6,00</span>
            <ArrowForward className={style.arrowPrice} />
            <span className={style.numberText}>R$650,00</span>
            <span className={style.textSmall}>Vende</span>
            <span>select_aqui</span>
            <span className={style.hours}>11:23 am</span>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={10} className={style.boxDetails}>
            <div className={style.textDetails}>
              Pagamento em Real pelo BANCO INTER, SANTANDER OU NUBANK
            </div>
            <button className={style.btContinue}>Negociar</button>
          </Grid>
        </Grid>
      </div>
    )
  }
}

CardOffer.propTypes = {

};

export default CardOffer;