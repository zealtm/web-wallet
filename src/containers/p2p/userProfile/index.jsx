import React from "react";
import PropTypes from "prop-types";

//MATERIAL
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

// COMPONENTS
import StarVotes from "../components/starvotes";

// styles
import style from "../style.css";

class UserProfile extends React.Component {
  render(){
    return (
      <Grid container className={style.baseUserProfile}>
        <Grid item xs={12} sm={12}>
          <div className={style.cardProfile}>
            <div className={style.userInfo}>
              <img
                src={"images/lunio/lunio-user@100x100.jpg"}
                className={style.avatarProfile}
              />
              <p className={style.userName}>
                Felipe Mendes <br />{" "}
                <div>
                  <StarVotes votes={4} />
                </div>
                <span className={style.textSmall}>
                  Usuário desde 12/10/1998
                </span>{" "}
              </p>{" "}
              <br />
            </div>
            <div className={style.userDescription}>
              <span className={style.spanDescription}>Descrição</span>
              <div className={style.textDescription}>
                <p>O usuário com mais numeros de trades!</p>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={12}>
          <div className={style.cardProfile}>
            <div className={style.data}>
              <span className={style.spanDescription}>Dados</span>
              <div className={style.hr} />
            </div>

            <div className={style.bars}>
              <span className={style.spanBars}>Negociações</span>
              <div className={style.barsNumbers}>
                <span>+500</span>
              </div>
            </div>
            <div className={style.bar} />

            <div className={style.bars}>
              <span className={style.spanBars}>Concluídas</span>
              <div className={style.barsNumbers}>
                <span>50%</span>
              </div>
            </div>
            <div className={style.bar} />
          </div>
        </Grid>

        <Grid item xs={12} sm={12}>
          <div className={style.cardProfile}>
            <div className={style.data}>
              <span className={style.spanDescription}>Feedback</span>
              <div className={style.hr} />
            </div>

            <div className={style.userFeedback}>
              <span className={style.spanDescription}>João
              </span>
                <div className={style.boxStar}>
                  <StarVotes votes={4} />
                </div>
              <div className={style.textDescription}>
                <p>Bom trader, recomendo!</p>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default UserProfile;