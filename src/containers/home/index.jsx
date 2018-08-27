import React from "react";
import i18n from "../../utils/i18n";
import { Link } from "react-router-dom";

// MATERIAL UI 
import Grid from "@material-ui/core/Grid";

// STYLE
import style from "./style.css";

import TransactionService from "../../services/transaction/transactionService";
import {getAuthToken} from "../../utils/localStorage" 

class Home extends React.Component {

  componentDidMount (){

    const token = getAuthToken();

    // testes transacao
    const dataFee = {
      "fromAddress": "mrmBsCMa8jw2btb9rTPpYyZHCED5UDPh5N",
      "toAddress": "moNjrdaiwked7d8jYoNxpCTZC4CyheckQH",
      "amount": 1
    }

    const novaTransacao = new TransactionService();

    const teste = novaTransacao.transaction(
      'lunes', 
      token, 
      20000000, 
      100, 
      "37RThBWionPuAbr8H4pzZJM6HYP2U6Y9nLr", 
      "37dV3nmnbwL8VSHVm1PGk5JUnPekUAxZGsN", 
      "", // seeed
      true
    );
    
  }

  render() {
    return (
      <div >
        <Grid container className={style.homeContainer}>
          <Grid item>
            <div className={style.cardHome}>
              <img src="/images/icons/general/wallet@3x.png" className={style.cardIcon} />
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
          </Grid>


          <Grid item>
            <div className={style.cardHome}>
              <img src="/images/icons/general/wallet@3x.png" className={style.cardIcon} />
              <div className={style.cardTitle}>{i18n.t("CARD_HOME_TITLE_2")} </div>
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
              <img src="/images/icons/general/wallet@3x.png" className={style.cardIcon} />
              <div className={style.cardTitle}>{i18n.t("CARD_HOME_TITLE_3")} </div>
              <div className={style.descriptionCard}>
                {i18n.t("CARD_HOME_DESCRIPTION_3")}
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
              <img src="/images/icons/general/wallet@3x.png" className={style.cardIcon} />
              <div className={style.cardTitle}>{i18n.t("CARD_HOME_TITLE_4")} </div>
              <div className={style.descriptionCard}>
                {i18n.t("CARD_HOME_DESCRIPTION_4")}
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
              <img src="/images/icons/general/wallet@3x.png" className={style.cardIcon} />
              <div className={style.cardTitle}>{i18n.t("CARD_HOME_TITLE_5")} </div>
              <div className={style.descriptionCard}>
                {i18n.t("CARD_HOME_DESCRIPTION_5")}
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
              <img src="/images/icons/general/wallet@3x.png" className={style.cardIcon} />
              <div className={style.cardTitle}> {i18n.t("CARD_HOME_TITLE_6")} </div>
              <div className={style.descriptionCard}>
                {i18n.t("CARD_HOME_DESCRIPTION_6")}
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
