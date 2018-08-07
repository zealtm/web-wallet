import React from "react";
import i18n from "../../utils/i18n";
import { Link } from "react-router-dom";

// MATERIAL UI 
import Grid from "@material-ui/core/Grid";

// STYLE
import style from "./style.css";

class Home extends React.Component {
  createCards = () => {
    let cards = [];
    for (let index = 0; index < 6; index++) {
      cards.push(
        <Grid item>
          <div className={style.cardHome}>
            <img src="/images/icons/wallet/wallet@3x.png" className={style.cardIcon} />
            <div className={style.cardTitle}>{i18n.t("CARD_HOME_TITLE_1")} </div>
            <div className={style.descriptionCard}>
              {i18n.t("CARD_HOME_DESCRIPTION_1")}
            </div>

            <Link to="#">
              <button className={style.buttonCard}>
                {i18n.t("BTN_LOGIN")}
              </button>
            </Link>
          </div>
        </Grid>)
    }

    return cards;
  }
  render() {
    return (
      <div >
        <Grid container className={style.homeContainer}>
          {this.createCards().map(cards => <div key={Math.random()}>{cards}</div>)}
        </Grid>
      </div>
    );
  }
}

export default Home;
