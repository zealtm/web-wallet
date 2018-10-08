import React from "react";
import PropTypes from "prop-types";

// MATERIAL
import { Grid, Avatar } from "@material-ui/core/";
import { ArrowForward, Star } from "@material-ui/icons/";

// STYLE
import style from "./style.css";

class CreateOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <div className={style.baseUser} >
        <Grid container>
          <Grid item xs={2}>
            <Avatar
              alt="avatar"
              src="https://loremflickr.com/40/40"
              className={style.avatar}
            />
          </Grid>
          <Grid item xs={5}>
            <span className={style.name}>Nome Usuario</span>
            <span className={style.textSmall}>00/00/2018</span>
           
          </Grid>
          <Grid item xs={5} style={{ paddingLeft: 10 }}>
            <div className={style.boxStar}>
              <Star className={style.starActive} />
              <Star className={style.starActive} />
              <Star className={style.starActive} />
              <Star className={style.starActive} />
              <Star className={style.star} />
            </div>
            
          </Grid>

          <Grid item xs={2} />
          <Grid item xs={10} className={style.boxDetails} >
            <div className={style.textDetails}>
              Pagamento em Real pelo BANCO INTER, SANTANDER OU NUBANK
            </div>
            <button className={style.btContinue}>Negociar</button>
          </Grid>

        </Grid>
      </div>
    );
  }
}

CreateOffer.propTypes = {};

export default CreateOffer;
