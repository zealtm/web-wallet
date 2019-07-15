import React from "react";
import i18n from "../../utils/i18n";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";

// STYLE
import style from "./style.css";
import { height } from "window-size";

class Maintenance extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: 3,
      isRedirect: false
    };
  }


  render() {
    let { timer } = this.state;
    return (
      <Grid item xs={12}>
        <Grid className={style.alignMainError}>
          <Grid className={style.mainError}>
            <Grid item xs={11} style={{position:"relative", left:"12px"}}>
              <img src="./images/lunio/lunio-error@1x.gif" style={{height:"25vh"}} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} className={style.alignItemsError}>
          <Grid item xs={11} className={style.itemsError500}>
            <h3> {i18n.t("MAINTENANCE")} </h3>
            {/* <div className={style.counter500}>{timer}</div> */}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Maintenance;
