import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setUserProfile, getProfile, clearUserProfile } from "../redux/p2pAction";

//MATERIAL
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";

// COMPONENTS
import StarVotes from "../components/starvotes";
import Loading from "../../../components/loading";

// styles
import style from "../style.css";
import colors from "../../../components/bases/colors";

// UTILS
import i18n from "../../../utils/i18n";
import { formatDate } from "../../../utils/numbers";

const styles = {
  root: {
    flexGrow: 1
  },
  colorPrimary: {
    backgroundColor: colors.purple.dark
  },
  barColorPrimary: {
    backgroundColor: colors.green.default
  }
};
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const { getProfile,userProfile } = this.props;
    if(userProfile.id){
      getProfile(userProfile.id);
    }else{
      getProfile();
    }
  };

  componentWillUnmount = () => {
    const {clearUserProfile} = this.props;
    clearUserProfile();
  }

  render() {
    const { classes, loading } = this.props;
    const { userProfile } = this.props;
    const dateCreate = formatDate(userProfile.createdAt);

    if (loading) return <Loading color="lunes" margin={"50% 0% 0% 0%"} />;
    
    return (
      <Grid container className={style.baseUserProfile}>
        <Grid item xs={12} sm={12}>
          <div className={style.cardProfile}>
            <div className={style.userInfo}>
              <img
                src={"images/lunio/lunio-user@100x100.jpg"}
                className={style.avatarProfile}
              />
              <div className={style.online} />
              <p className={style.userName}>
                {userProfile.name} {userProfile.surname}
                <br />{" "}
                <div className={style.boxStar}>
                  {userProfile.rating && (
                    <StarVotes votes={userProfile.rating.average} />
                  )}
                </div>
               { userProfile && <span className={style.textSmall}>
                  {i18n.t("P2P_PROFILE_USER_DATE")} {dateCreate}
                </span>}
              </p>{" "}
              <br />
            </div>
            <div className={style.userDescription}>
              <span className={style.spanDescription}>
                {i18n.t("P2P_PROFILE_DESCRIPTION")}
              </span>
              <div className={style.textDescription}>
                <p>{userProfile.description}</p>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={12}>
          <div className={style.cardProfile}>
            <div className={style.data}>
              <span className={style.spanDescription}>
                {i18n.t("P2P_PROFILE_DATA")}
              </span>
              <div className={style.hr} />
            </div>

            <div className={style.bars}>
              <span className={style.spanBars}>
                {i18n.t("P2P_PROFILE_NEGOTIATIONS")}
              </span>

              <div className={style.barsNumbers}>
                <span>+500</span>
              </div>
            </div>
            <LinearProgress
              className={style.bar}
              classes={{
                colorPrimary: classes.colorPrimary,
                barColorPrimary: classes.barColorPrimary
              }}
              value={100}
              variant="determinate"
            />

            <div className={style.bars}>
              <span className={style.spanBars}>
                {i18n.t("P2P_PROFILE_CONCLUDED")}
              </span>

              <div className={style.barsNumbers}>
                <span>50%</span>
              </div>
            </div>
            <LinearProgress
              className={style.bar}
              classes={{
                colorPrimary: classes.colorPrimary,
                barColorPrimary: classes.barColorPrimary
              }}
              value={50}
              variant="determinate"
            />
          </div>
        </Grid>

        <Grid item xs={12} sm={12}>
          <div className={style.cardProfile}>
            <div className={style.data}>
              <span className={style.spanDescription}>
                {i18n.t("P2P_PROFILE_FEEDBACK")}
              </span>
              <div className={style.hr} />
            </div>

            <div className={style.userFeedback}>
              <span className={style.spanDescription}>João</span>
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
    );
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  getProfile: PropTypes.func,
  userProfile: PropTypes.object,
  setUserProfile: PropTypes.func,
  clearUserProfile: PropTypes.func,
  loading: PropTypes.bool
};

const mapStateToProps = store => ({
  userProfile: store.p2p.userProfile,
  userEmail: store.user.user.email,
  loading: store.p2p.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getProfile,
      setUserProfile,
      clearUserProfile
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserProfile));
