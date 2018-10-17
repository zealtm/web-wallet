import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import FileUploadProgress from "react-fileupload-progress";

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
    letterSpacing: "0.5px"
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
  focused: {},
  progressWrapper: {
    height: "5px",
    marginTop: "10px",
    width: "50px",
    float: "left",
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    borderRadius: "6px",
    WebkitBoxShadow: "inset 0 1px 2px rgba(0,0,0,.1)",
    boxShadow: "inset 0 1px 2px rgba(0,0,0,.1)"
  },
  progressBar: {
    float: "left",
    width: "0",
    height: "100%",
    fontSize: "12px",
    lineHeight: "20px",
    color: "#fff",
    textAlign: "center",
    backgroundColor: "#65e986",
    WebkitBoxShadow: "inset 0 -1px 0 rgba(0,0,0,.15)",
    boxShadow: "inset 0 -1px 0 rgba(0,0,0,.15)",
    WebkitTransition: "width .6s ease",
    Otransition: "width .6s ease",
    transition: "width .6s ease"
  },
  cancelButton: {
    marginTop: "2px",
    WebkitAppearance: "none",
    padding: 0,
    cursor: "pointer",
    background: "0 0",
    border: 0,
    float: "left",
    fontSize: "21px",
    fontWeight: 700,
    lineHeight: 1,
    color: "#f05252"
  },

  sendIcon: {
    float: "left",
    backgroundColor: "transparent",
    border: 0,
    color: "red"
  },

  bsButton: {
    marginLeft: "25px",
    fontSize: "12px",
    lineHeight: "1.5",
    borderRadius: "3px",
    color: "#fff",
    backgroundColor: "#65e986",
    borderColor: "#65e986",
    display: "inline-block",
    padding: "6px 12px",
    marginBottom: 0,
    fontWeight: 400,
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    touchAction: "manipulation",
    cursor: "pointer",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
    backgroundImage: "none",
    border: "1px solid transparent"
  }
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

  formGetter() {
    return new FormData(document.getElementById("customForm"));
  }

  customFormRenderer(onSubmit) {
    return (
      <form id="customForm" >
        <input type="file" name="file" id="exampleInputFile" />
        <button type="button" style={inputStyle.bsButton} onClick={onSubmit}>
          Upload
        </button>
      </form>
    );
  }

  customProgressRenderer(progress, hasError, cancelHandler) {
    if (hasError || progress > -1) {
      let barStyle = Object.assign({}, inputStyle.progressBar);
      barStyle.width = progress + "%";

      let message = <span>{barStyle.width}</span>;
      if (hasError) {
        barStyle.backgroundColor = "#f05252";
        message = (
          <span style={{ color: "#f05252" }}>Failed to upload ...</span>
        );
      }
      if (progress === 100) {
        message = <span>Done</span>;
      }

      return (
        <div>
          <button style={inputStyle.sendIcon}>
            <span>
              <img src="images/icons/security/anexo@1x.png" />
            </span>
          </button>
          <div style={inputStyle.progressWrapper}>
            <div style={barStyle} />
          </div>
          <button style={inputStyle.cancelButton} onClick={cancelHandler}>
            <span>&times;</span>
          </button>
          <div style={{ clear: "left" }}>{message}</div>
        </div>
      );
    } else {
      return;
    }
  }

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
                          <div>
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
                          <div>
                            <img src="images/icons/security/anexo@1x.png" />
                          </div>
                        </Hidden>
                        <p>{i18n.t("SETTINGS_USER_ZIP_CODE")}</p>
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
                          width={"calc(100% - 60px)"}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <p>Estado</p>

                        <Select
                          list={1}
                          title={"Estado"}
                          selectItem={"1"}
                          width={"calc(100% - 60px)"}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} className={style.boxKYC_3}>
                      <FileUploadProgress
                        id="fileupload"
                        key="ex1"
                        // url="http://localhost:3000/api/upload"
                        onProgress={(e, request, progress) => {
                          console.log("progress", e, request, progress);
                        }}
                        onLoad={(e, request) => {
                          console.log("load", e, request);
                        }}
                        onError={(e, request) => {
                          console.log("error", e, request);
                        }}
                        onAbort={(e, request) => {
                          console.log("abort", e, request);
                        }}
                        formGetter={this.formGetter.bind(this)}
                        formRenderer={this.customFormRenderer.bind(this)}
                        progressRenderer={this.customProgressRenderer.bind(
                          this
                        )}
                      />
                    </Grid>
                  </Grid>

                  <Grid item className={style.contentKYC_2}>
                    <Grid container className={style.boxKYC_2}>
                      <Grid item xs={12}>
                        <div>
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
                      <Grid item xs={12} className={style.boxKYC_3}>
                        <FileUploadProgress
                          id="fileupload"
                          key="ex1"
                          // url="http://localhost:3000/api/upload"
                          onProgress={(e, request, progress) => {
                            console.log("progress", e, request, progress);
                          }}
                          onLoad={(e, request) => {
                            console.log("load", e, request);
                          }}
                          onError={(e, request) => {
                            console.log("error", e, request);
                          }}
                          onAbort={(e, request) => {
                            console.log("abort", e, request);
                          }}
                          formGetter={this.formGetter.bind(this)}
                          formRenderer={this.customFormRenderer.bind(this)}
                          progressRenderer={this.customProgressRenderer.bind(
                            this
                          )}
                        />
                      </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <center>
                      <Grid item xs={12} sm={6}>
                        <button className={style.buttonEnableSecurity}>
                          {i18n.t("BTN_CONFIRM")}
                        </button>
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
