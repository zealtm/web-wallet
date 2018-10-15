import React from "react";
import { Link, withRouter } from "react-router-dom";
import style from "../style.css";
import Grid from "@material-ui/core/Grid";
import i18n from "../../../utils/i18n";

class Security extends React.Component {
  render() {
    return (
      <div>
        <Grid container className={style.containerSettings}>
          <Grid item xs={10} sm={11} className={style.headerSettings}>
            <h2>{i18n.t("SETTINGS_TITLE")}</h2>
            <p>{i18n.t("SETTINGS_HEADER_INFO")}</p>
          </Grid>

          <Grid container className={style.containerCardsSettings}>
            <Grid item xs={12} sm={3} className={style.cardsSettings}>
              <Link to="/TwoFactoryAuthenticate">
                <Grid className={style.cards}>autent. 2fa</Grid>
              </Link>
            </Grid>

            <Grid item xs={12} sm={3} className={style.cardsSettings}>
              <Link to="/CellPhoneAuthenticate">
                <Grid className={style.cards}>cll</Grid>
              </Link>
            </Grid>

            <Grid item xs={12} sm={3} className={style.cardsSettings}>
              <Link to="#">
                <Grid className={style.cards}>kyc</Grid>
              </Link>
            </Grid>

          
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Security);
