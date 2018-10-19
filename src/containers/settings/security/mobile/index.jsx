import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import compose from "recompose/compose";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTwoFactorAuth } from "../../redux/settingsAction";
import { errorInput } from "../../../errors/redux/errorAction";

// STYLE
import style from "../../style.css";
import colors from "../../../../components/bases/colors";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import { withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";

// UTILS
import i18n from "../../../../utils/i18n";
import { inputValidator } from "../../../../utils/inputValidator";

// COMPONENTS
import Loading from "../../../../components/loading";
import { PhoneMask } from "../../../../components/inputMask";

const inputStyle = {
  inputMobile: {
    color: colors.messages.info,
    margin: "0",
    padding: "5px",
    fontSize: "18px",
    width: "95%",
    "&:hover:before": {
      borderBottomColor: colors.purple.clear
    }
  },
  root: {
    color: colors.messages.info,
    margin: "0",
    padding: "5px",
    fontSize: "32px",
    width: "calc(100% - 50px)",
    "&:hover:before": {
      borderBottomColor: colors.purple.clear
    }
  },
  cssInput: {
    fontFamily: "Noto Sans, sans-serif",
    letterSpacing: "0.5px",
    textAlign: "center"
  },
  cssUnderline: {
    "&:before, &:after": {
      borderBottomColor: colors.purple.clear
    },
    "&:hover:not($disabled):not($error):not($focused):before": {
      borderBottomColor: `${colors.purple.clear} !important`
    }
  },
  disabled: {},
  error: {},
  focused: {}
};
class MobileAuthenticator extends React.Component {
  constructor() {
    super();
    this.state = {
      phone: "",
      errors: true
    };
  }

  handlePhoneChange = event => {
    let { phone } = this.state;
    console.log("teste", phone.length);

    this.setState({
      ...this.state,
      phone: event.value
    });

    if (phone.length === 10) {
      this.setState({
        ...this.state,
        errors: false
      });
    }
  };

  inputValidator = () => {
    // alert("click");
    let { phone } = this.state;
    if (phone.length != 10) {
      this.setState({
        ...this.state,
        errors: true
      });
      alert("Erro");
    } else {
      this.setState({
        ...this.state,
        errors: false
      });
      alert("Certo");
    }
  };

  renderTwoFactor = () => {
    let { settings, twoFactor } = this.props;
    if (twoFactor) {
      return <div>{i18n.t("SECURITY_2FA_REGISTRED")}</div>;
    }

    return (
      <Grid item xs={8} className={style.twoFactorQr}>
        <Grid item xs={3} className={style.item}>
          <Grid className={style.contentItem}>
            {settings.security.urlImage ? (
              <img width="200px" src={settings.security.urlImage} />
            ) : (
              <Loading />
            )}
          </Grid>
        </Grid>

        <Grid item xs={3} className={style.item}>
          <Grid className={style.contentItem}>
            <Grid item>1</Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <div>
        <Grid container className={style.containerHeaderSettings}>
          <Grid item xs={12} className={style.headerSettingsDefault}>
            <Hidden smUp>
              <Grid item xs={12}>
                <h3>{i18n.t("TITLE_SECURITY_2")} </h3>
              </Grid>
            </Hidden>
            <Grid item sm={2} />

            <Grid item xs={6} sm={2}>
              <Link to="security">
                <p>{i18n.t("SECURITY_LINK_RETURN")}</p>
              </Link>
            </Grid>
            <Hidden xsDown>
              <Grid item xs={12} sm={3}>
                <h3>{i18n.t("TITLE_SECURITY_2")}</h3>
              </Grid>
            </Hidden>

            <Grid item xs={10} sm={6} id={"hr"}>
              <hr />
            </Grid>
          </Grid>
        </Grid>

        <div className={style.containerSecurity}>
          <Grid item xs={11} sm={8}>
            <Grid container className={style.allSecurity}>
              <Grid item xs={12} className={style.containerItems}>
                <Grid item xs={12} className={style.counterItemsMobile}>
                  <Grid item xs={12} sm={3} className={style.columItems}>
                    <Grid className={style.indicatorItemMobile}>
                      {"1"} <p>{i18n.t("SECURITY_ITEM_1")}</p>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={3} className={style.columItems}>
                    <Grid className={style.indicatorItemMobile}>
                      {"2"} <p> {i18n.t("SECURITY_ITEM_2")} </p>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sm={3} className={style.columItems}>
                    <Grid className={style.indicatorItemMobile}>
                      {"3"} <p>{i18n.t("SECURITY_ITEM_3")}</p>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container className={style.contentMobile}>
                <h3>{i18n.t("SECURITY_INSERT_PHONE")}</h3>
                <Grid container className={style.alignNumberField}>
                  <Grid item xs={12} sm={9} className={style.fontSizeInput}>
                    <Hidden smUp>
                      <Grid item xs={12}>
                        <Input
                          classes={{
                            root: classes.root,
                            underline: classes.cssUnderline,
                            input: classes.cssInput
                          }}
                          name="phone"
                          width={"100%"}
                          inputComponent={PhoneMask}
                          onChange={event =>
                            this.handlePhoneChange(event.target)
                          }
                          value={this.phone}
                        />
                        Mobile
                      </Grid>
                    </Hidden>
                    <Grid item sm={2} />

                    <Hidden xsDown>
                      <Input
                        classes={{
                          root: classes.root,
                          underline: classes.cssUnderline,
                          input: classes.cssInput
                        }}
                        name="phone"
                        width={"100%"}
                        inputComponent={PhoneMask}
                        onChange={event => this.handlePhoneChange(event.target)}
                        value={this.phone}
                      />
                      web
                    </Hidden>
                  </Grid>
                  <Grid item xs={12} sm={3} className={style.alignButtonMobile}>
                    <button
                      // disabled
                      className={
                        errors
                          ? style.buttonDisabledMobile
                          : style.buttonEnableSecurity
                      }
                      onClick={() => this.inputValidator()}
                    >
                      {i18n.t("BTN_SUBMIT")}
                    </button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

MobileAuthenticator.propTypes = {
  twoFactor: PropTypes.bool,
  loadingSettings: PropTypes.func,
  getTwoFactorAuth: PropTypes.func,
  clearMessage: PropTypes.func,
  errorInput: PropTypes.func,
  settings: PropTypes.object
};

const mapStateToProps = store => ({
  twoFactor: store.user.twoFactor,
  settings: store.settings
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTwoFactorAuth,
      errorInput
    },
    dispatch
  );
export default compose(
  withStyles(inputStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(MobileAuthenticator);
