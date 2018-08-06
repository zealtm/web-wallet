import React from "react";
import i18n from "../../utils/i18n";
import { Link } from "react-router-dom";

// MATERIAL UI 
import Grid from "@material-ui/core/Grid";

// STYLE
import style from "./style.css";


class Home extends React.Component {
  render() {
    return (
      <div>
        <Grid container className={style.homeContainer}>          

          <Grid item>
            <div className={style.cardHome}>
              <img src="/images/icons/wallet/wallet@3x.png" className={style.cardIcon} />
              <div className={style.cardTitle}> 1 {i18n.t("CARD_HOME_TITLE_2")} </div>
              <div className={style.descriptionCard}>
                {i18n.t("CARD_HOME_DESCRIPTION_2")}
              </div>

              <Link to="#">
                <button className={style.buttonCard}>
                  {i18n.t("BTN_LOGIN")}
                </button>
              </Link>
              
            </div>
          </Grid>


          <Grid item>
            <div className={style.cardHome}>
              <img src="/images/icons/wallet/wallet@3x.png" className={style.cardIcon} />
              <div className={style.cardTitle}> 2 {i18n.t("CARD_HOME_TITLE_2")} </div>
              <div className={style.descriptionCard}>
                {i18n.t("CARD_HOME_DESCRIPTION_2")}
              </div>

              <Link to="#">
                <button className={style.buttonCard}>
                  {i18n.t("BTN_LOGIN")}
                </button>
              </Link>
              
            </div>
          </Grid>


          <Grid item>
            <div className={style.cardHome}>
              <img src="/images/icons/wallet/wallet@3x.png" className={style.cardIcon} />
              <div className={style.cardTitle}> 3 {i18n.t("CARD_HOME_TITLE_2")} </div>
              <div className={style.descriptionCard}>
                {i18n.t("CARD_HOME_DESCRIPTION_2")}
              </div>

              <Link to="#">
                <button className={style.buttonCard}>
                  {i18n.t("BTN_LOGIN")}
                </button>
              </Link>
              
            </div>
          </Grid>


          <Grid item>
            <div className={style.cardHome}>
              <img src="/images/icons/wallet/wallet@3x.png" className={style.cardIcon} />
              <div className={style.cardTitle}> 4 {i18n.t("CARD_HOME_TITLE_2")} </div>
              <div className={style.descriptionCard}>
                {i18n.t("CARD_HOME_DESCRIPTION_2")}
              </div>

              <Link to="#">
                <button className={style.buttonCard}>
                  {i18n.t("BTN_LOGIN")}
                </button>
              </Link>
              
            </div>
          </Grid>

          <Grid item>
            <div className={style.cardHome}>
              <img src="/images/icons/wallet/wallet@3x.png" className={style.cardIcon} />
              <div className={style.cardTitle}> 5 {i18n.t("CARD_HOME_TITLE_2")} </div>
              <div className={style.descriptionCard}>
                {i18n.t("CARD_HOME_DESCRIPTION_2")}
              </div>

              <Link to="#">
                <button className={style.buttonCard}>
                  {i18n.t("BTN_LOGIN")}
                </button>
              </Link>
              
            </div>
          </Grid>


          <Grid item>
            <div className={style.cardHome}>
              <img src="/images/icons/wallet/wallet@3x.png" className={style.cardIcon} />
              <div className={style.cardTitle}> 6 {i18n.t("CARD_HOME_TITLE_2")} </div>
              <div className={style.descriptionCard}>
                {i18n.t("CARD_HOME_DESCRIPTION_2")}
              </div>

              <Link to="#">
                <button className={style.buttonCard}>
                  {i18n.t("BTN_LOGIN")}
                </button>
              </Link>
              
            </div>
          </Grid>

         

        </Grid>
      </div>
    );
  }
}

export default Home;
