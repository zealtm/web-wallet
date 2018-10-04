import React from "react";
import PropTypes from "prop-types";

// MATERIAL 
import {Grid,Avatar} from "@material-ui/core/";
import {ArrowForward,Star} from "@material-ui/icons/";

// STYLE
import style from "./style.css";

class CardOffer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      openDetails: false
    }
  }

  handleDetails = () => {
    this.setState({
      ...this.state, 
      openDetails: !this.state.openDetails
    })
  }
  
  render(){
    const {openDetails} = this.state;
    return (
      <div className={style.baseUser} onClick={this.handleDetails}>
        <Grid container>
          <Grid item xs={2}>
            <Avatar alt="avatar" src="https://loremflickr.com/40/40" className={style.avatar} />
          </Grid>
          <Grid item xs={5}>
            <span className={style.name}>Nome Usuario</span>
            <span className={style.textSmall}>00/00/2018</span>
            <span className={style.numberText}>20.00000000</span>
            <span className={style.textSmall}>Oferta</span>
            <div className={style.offerText}>
              <img src="images/icons/coins/lunes.png" />
              Lunes
            </div>
          </Grid>
          <Grid item xs={5} style={{paddingLeft:10}}>
            <div className={style.boxStar}>
              <Star className={style.starActive}/>
              <Star className={style.starActive}/>
              <Star className={style.starActive}/>
              <Star className={style.starActive}/>
              <Star className={style.star}/>
            </div>
            <span className={style.textSmall}>Unid. R$6,00</span>
            <ArrowForward className={style.arrowPrice} />
            <span className={style.numberText}>R$650,00</span>
            <span className={style.textSmall}>Vende</span>
            <div className={style.offerText}>
              <img src="images/icons/coins/lunes.png" />
              <img src="images/icons/coins/lunes.png" />
              <img src="images/icons/coins/lunes.png" />
              <img src="images/icons/coins/lunes.png" />
            </div>
            <span className={style.hours}>11:23 am</span>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={10} className={style.boxDetails} style={(openDetails)?{display:"block"}:null} >
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