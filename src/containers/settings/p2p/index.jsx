import React from "react";
import { Link } from "react-router-dom";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";

// STYLE
import style from "./style.css";

// UTILS
import i18n from "../../../utils/i18n";

class P2P extends React.Component {
  render() {
    return (
      <div className={style.boxContainer}>
        <Grid container className={style.p2pContainer}>

          <Grid item>
            <div className={style.cardP2p}>
              <div>
                <p>Teste</p>
              </div>
              <img src="/images/icons/general/leasing@2x.png" />
            </div>
          </Grid>

          <Grid item>
            <div className={style.cardP2p}>
              <div>
                <p>Teste</p>
              </div>
              <img src="/images/icons/general/leasing@2x.png" />
            </div>
          </Grid>

          <Grid item>
            <div className={style.cardP2p}>
              <div>
                <p>Teste</p>
              </div>
              <img src="/images/icons/general/leasing@2x.png" />
            </div>
          </Grid>

          <Grid item>
            <div className={style.cardP2p}>
              <div>
                <p>Teste</p>
              </div>
              <img src="/images/icons/general/leasing@2x.png" />
            </div>
          </Grid>
          
        </Grid>
      </div>
    );
  }
}

export default P2P;
