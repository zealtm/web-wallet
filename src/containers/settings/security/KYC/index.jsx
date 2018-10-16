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

// COMPONENTS
import Loading from "../../../../components/loading";
import Select from "../../../../components/select";

const inputStyle = {
  root: {
    color: colors.messages.info,
    margin: "0",
    padding: "5px",
    width: "calc(100% - 50px)",
    "&:hover:before": {
      borderBottomColor: colors.purple.dark
    }
  },
  cssInput: {
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "17px",
    letterSpacing: "0.5px",
    textAlign: "center"
  },
  cssUnderline: {
    "&:before, &:after": {
      borderBottomColor: colors.purple.dark
    },
    "&:hover:not($disabled):not($error):not($focused):before": {
      borderBottomColor: `${colors.purple.dark} !important`
    }
  },
  disabled: {},
  error: {},
  focused: {}
};
class KYC extends React.Component {
  componentDidMount() {
    let { getTwoFactorAuth, settings, twoFactor } = this.props;
    if (!twoFactor && !settings.security.urlImage) getTwoFactorAuth();
  }

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
    return (
      <div>
        <Grid container className={style.containerHeaderSettings}>
          <Grid item xs={12} className={style.headerSettingsDefault}>
            <Hidden smUp>
              <Grid item xs={12}>
                <h3>{i18n.t("TITLE_SECURITY_3")} </h3>
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
                <h3>{i18n.t("TITLE_SECURITY_3")}</h3>
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
                <Grid item xs={12} className={style.counterItemsKYC}>
                  <Grid item xs={12} sm={3} className={style.columItems}>
                    <Grid className={style.indicatorItemKYC}>
                      {"1"} <p>{i18n.t("SECURITY_ITEM_1")}</p>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={3} className={style.columItems}>
                    <Grid className={style.indicatorItemKYC}>
                      {"2"} <p> {i18n.t("SECURITY_ITEM_2")} </p>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={3} className={style.columItems}>
                    <Grid className={style.indicatorItemKYC}>
                      {"3"} <p>{i18n.t("SECURITY_ITEM_3")}</p>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={style.containerKYC}>
                <Grid item xs={12} sm={10} className={style.wrapperKYC}>
                  <Grid container className={style.contentKYC}>
                    <Grid container className={style.boxKYC_1}>
                      <Grid item xs={12} sm={6}>
                        <Hidden smUp>
                          <div
                            
                          >
                            <img src="images/icons/security/anexo@1x.png" />
                          </div>
                        </Hidden>
                        <p>Endereço</p>
                        <Input
                          classes={{
                            root: classes.root,
                            underline: classes.cssUnderline,
                            input: classes.cssInput
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Hidden xsDown>
                          <div
                            
                          >
                            <img src="images/icons/security/anexo@1x.png" />
                          </div>
                        </Hidden>
                        <p>CEP</p>
                        <Input
                          classes={{
                            root: classes.root,
                            underline: classes.cssUnderline,
                            input: classes.cssInput
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Grid container className={style.boxKYC_2}>
                      <Grid item xs={6}>
                        <p>Cidade</p>
                        <Select
                          list={1}
                          title={"Cidade"}
                          selectItem={"1"}
                          width={"calc(100% - 50px)"}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <p>Estado</p>

                        <Select
                          list={1}
                          title={"Estado"}
                          selectItem={"1"}
                          width={"calc(100% - 50px)"}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item className={style.contentKYC}>
                    <Grid container className={style.boxKYC_1}>
                      <Grid item xs={12}>
                        <div
                          
                        >
                          <img src="images/icons/security/anexo@1x.png" />
                        </div>
                        <p> CPF/CNPJ/CNH/Passaporte</p>
                        <Input
                          classes={{
                            root: classes.root,
                            underline: classes.cssUnderline,
                            input: classes.cssInput
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <center>
                      <Grid item xs={12} sm={6}>
                        <button className={style.buttonEnableSecurity}>confirm</button>
                      </Grid>
                    </center>
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

KYC.propTypes = {
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
)(KYC);
