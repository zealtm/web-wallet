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
              <h1>Plano básico</h1>
              <img
                src="/images/icons/p2p/card.png"
                className={style.cardIcon}
              />
              <div className={style.hr} />
              <div className={style.cardTitle}>
                <p>
                  O plano básico de P2P te permitirá usar o sistema Lunes de P2P
                  por um mês
                </p>
              </div>
              <div className={style.valueCard}>
                <span className={style.dollarSign}>R$</span>{" "}
                <div className={style.containerValue}>
                  <span className={style.value}>15</span>{" "}
                  <span className={style.decimals}>,00</span>
                </div>
              </div>
            </div>
          </Grid>

          <Grid item>
            <div className={style.cardP2p}>
              <h1>Plano básico</h1>
              <img
                src="/images/icons/p2p/card.png"
                className={style.cardIcon}
              />
              <div className={style.hr} />
              <div className={style.cardTitle}>
                <p>
                  O plano básico de P2P te permitirá usar o sistema Lunes de P2P
                  por um mês
                </p>
              </div>
              <div className={style.valueCard}>
                <span className={style.dollarSign}>R$</span>{" "}
                <div className={style.containerValue}>
                  <span className={style.value}>15</span>{" "}
                  <span className={style.decimals}>,00</span>
                </div>
              </div>
            </div>
          </Grid>

          <Grid item>
            <div className={style.cardP2p}>
              <h1>Plano básico</h1>
              <img
                src="/images/icons/p2p/card.png"
                className={style.cardIcon}
              />
              <div className={style.hr} />
              <div className={style.cardTitle}>
                <p>
                  O plano básico de P2P te permitirá usar o sistema Lunes de P2P
                  por um mês
                </p>
              </div>
              <div className={style.valueCard}>
                <span className={style.dollarSign}>R$</span>{" "}
                <div className={style.containerValue}>
                  <span className={style.value}>15</span>{" "}
                  <span className={style.decimals}>,00</span>
                </div>
              </div>
            </div>
          </Grid>

          <Grid item>
            <div className={style.cardP2p}>
              <h1>Plano básico</h1>
              <img
                src="/images/icons/p2p/card.png"
                className={style.cardIcon}
              />
              <div className={style.hr} />
              <div className={style.cardTitle}>
                <p>
                  O plano básico de P2P te permitirá usar o sistema Lunes de P2P
                  por um mês
                </p>
              </div>
              <div className={style.valueCard}>
                <span className={style.dollarSign}>R$</span>{" "}
                <div className={style.containerValue}>
                  <span className={style.value}>15</span>{" "}
                  <span className={style.decimals}>,00</span>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default P2P;
