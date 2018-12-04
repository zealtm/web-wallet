import React from "react";
import PropTypes from "prop-types";

//MATERIAL
import Grid from "@material-ui/core/Grid";
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';

// COMPONENTS
import StarVotes from "../components/starvotes";

// styles
import style from "../style.css";
import colors from "../../../components/bases/colors";

// UTILS
import i18n from "../../../utils/i18n";

const styles = {
  root: {
    flexGrow: 1,
  },
  colorPrimary: {
    backgroundColor: colors.purple.dark,
  },
  barColorPrimary: {
    backgroundColor: colors.green.default,
  },
};
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const { classes } = this.props;
    return (
      <Grid container className={style.baseUserProfile}>
        <Grid item xs={12} sm={12}>
          <div className={style.cardProfile}>
            <div className={style.userInfo}>
             
              <img
                src={"images/lunio/lunio-user@100x100.jpg"}
                className={style.avatarProfile}
              />
               <div className={style.online} ></div>
              <p className={style.userName}>
                Felipe Mendes <br />{" "}
                <div className={style.boxStar}>
                  <StarVotes votes={4} />
                </div>
                <span className={style.textSmall}>
                  {i18n.t("P2P_PROFILE_USER_DATE")} 12/10/1998
                </span>{" "}
              </p>{" "}
              <br />
            </div>
            <div className={style.userDescription}>
              <span className={style.spanDescription}>{i18n.t("P2P_PROFILE_DESCRIPTION")}</span>
              <div className={style.textDescription}>
                <p>3º maior Node da rede e faço negociação na plataforma desde 2015.</p>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={12}>
          <div className={style.cardProfile}>
            <div className={style.data}>
              <span className={style.spanDescription}>{i18n.t("P2P_PROFILE_DATA")}</span>
              <div className={style.hr} />
            </div>

            <div className={style.bars}>
              <span className={style.spanBars}>{i18n.t("P2P_PROFILE_NEGOTIATIONS")}</span>
              
              <div className={style.barsNumbers}>
                <span>+500</span>
              </div>
            </div>
            <LinearProgress className={style.bar} classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }} value={100} variant="determinate"/>

            <div className={style.bars}>
              <span className={style.spanBars}>{i18n.t("P2P_PROFILE_CONCLUDED")}</span>
              
              <div className={style.barsNumbers}>
                <span>50%</span>
              </div>
            </div>
            <LinearProgress className={style.bar} classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }} value={50} variant="determinate"  />
          </div>
        </Grid>

        <Grid item xs={12} sm={12}>
          <div className={style.cardProfile}>
            <div className={style.data}>
              <span className={style.spanDescription}>{i18n.t("P2P_PROFILE_FEEDBACK")}</span>
              <div className={style.hr} />
            </div>

            <div className={style.userFeedback}>
              <span className={style.spanDescription}>João
              </span>
                <div className={style.feedbackBox}>
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
UserProfile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UserProfile);