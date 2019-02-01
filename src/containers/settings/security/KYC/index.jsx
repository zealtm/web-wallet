import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FileUploadProgress from "react-fileupload-progress";

// STYLE
import style from "../../style.css";
import colors from "../../../../components/bases/colors";

//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getKyc } from "../../redux/settingsAction";

// MATERIAL UI
import { Grid, Input, Select, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";

// UTILS
import i18n from "../../../../utils/i18n";

// ICONS
import Done from "@material-ui/icons/Done";

// COMPONENTS
import { CEP } from "../../../../components/inputMask";
import infoContainer from "../infoContainer";

const inputStyle = {
  root: {
    color: colors.messages.info,
    marginBottom: "5px",
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
  alignForm: {
    display: "flex",
    alignItems: "center"
  },
  input: {
    width: "100%",
    backgroundColor: colors.purple.dark,
    borderRadius: "25px",
    padding: "10px"
  },
  underline: {
    width: "90%",
    "&:hover": {
      backgroundColor: colors.purple.dark
    },
    "&:before": {
      borderColor: colors.purple.dark
    },
    "&:after": {
      borderColor: colors.purple.dark
    }
  },
  underlineItems: {
    color: "white",
    borderBottomColor: `${colors.green.default} !important`,
    fontSize: "1em",
    width: "100%",
    icon: {
      fill: "green"
    }
  },
  icon: {
    fill: colors.purple.dark
  }
};
class KYC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enableButtonUpload: false,
      enableButtonConfirm: false,
      address: "",
      state: "",
      city: ""
    };
  }
  componentDidMount = () => {
    const { getKyc } = this.props;
    getKyc();
  };
  formGetter() {
    return new FormData(document.getElementById("customForm"));
  }

  enableButtonUpload = () => {
    this.setState({
      ...this.state,
      enableButtonUpload: true
    });
  };

  customFormRenderer(onSubmit, value) {
    return (
      <form id="customForm" style={inputStyle.alignForm}>
        <div style={inputStyle.input}>
          <label htmlFor="inputFile" style={{ float: "left" }}>
            <img src="images/icons/camera/camera@2x.png" alt="camera" />
          </label>
          <input
            aria-label
            style={{ display: "none" }}
            type="file"
            id="inputFile"
            onClick={() => this.enableButtonUpload()}
          />
          <span
            style={{ marginLeft: "15px", color: "#654fa4", fontSize: "12px" }}
          >
            {value}
          </span>
          <img
            src="images/icons/security/anexo@1x.png"
            alt="anexo"
            style={{ float: "right" }}
            onClick={onSubmit}
          />
        </div>
      </form>
    );
  }

  customProgressRenderer(progress, hasError, cancelHandler) {
    if (hasError || progress > -1) {
      let barStyle = Object.assign({}, inputStyle.progressBar);
      barStyle.width = progress + "%";

      let message = <span>{barStyle.width}</span>;
      if (hasError) {
        barStyle.backgroundColor = "#68f285";
        message = (
          <span style={{ color: "#f05252" }}>
            {i18n.t("TEXT_FAILED_UPLOAD")}
          </span>
        );
      }
      if (progress === 100) {
        message = (
          <div
            style={{
              display: "flex",
              color: "#68f285"
            }}
          >
            <span>
              <Done />
            </span>
          </div>
        );
      }

      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <button style={inputStyle.sendIcon}>
            <span>
              <img
                src="images/icons/security/anexo@1x.png"
                style={{ width: "12px" }}
              />
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

  listStates = () => {
    const { classes } = this.props;
    const states = ["São Paulo", "Rio de Janeiro"];

    return states.map((item, index) => (
      <MenuItem
        value={item}
        key={index}
        classes={{
          root: classes.menuItemRoot
        }}
      >
        {item}
      </MenuItem>
    ));
  };

  handleInput = property => e => {
    this.setState({
      [property]: e.target.value
    });
  };

  render() {
    const { classes, kyc } = this.props;
    const { enableButtonConfirm } = this.state;
    const MenuProps = {
      PaperProps: {
        style: {
          color: "#fff",
          maxHeight: 40 * 4.5,
          marginTop: "45px",
          backgroundColor: "#473088",
          width: "10%"
        }
      }
    };
    
    console.log("Kyc -> ", kyc);
    
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
              </Grid>{/**Grid containerItens */}
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
                        <p>{i18n.t("SETTINGS_USER_ADDRESS")}</p>
                        <Input
                          value={this.state.address}
                          onChange={this.handleInput("address")}
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
                          inputComponent={CEP}
                        />
                      </Grid>
                    </Grid>
                    <Grid container className={style.boxKYC_2}>
                      <Grid item xs={6} sm={6}>
                        <p>{i18n.t("SETTINGS_USER_CITY")}</p>
                        <Select
                          classes={{ selectMenu: classes.underlineItems }}
                          value={this.state.city}
                          MenuProps={MenuProps}
                          input={
                            <Input
                              classes={{
                                underline: classes.underline
                              }}
                            />
                          }
                          inputProps={{
                            classes: {
                              icon: classes.icon
                            }
                          }}
                          renderValue={value => value}
                          onChange={this.handleInput("city")}
                        >
                          {this.listStates()}
                        </Select>
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <p>{i18n.t("SETTINGS_USER_STATE")}</p>
                        <Select
                          classes={{ selectMenu: classes.underlineItems }}
                          value={this.state.state}
                          MenuProps={MenuProps}
                          input={
                            <Input
                              classes={{
                                underline: classes.underline
                              }}
                            />
                          }
                          inputProps={{
                            classes: {
                              icon: classes.icon
                            }
                          }}
                          renderValue={value => value}
                          onChange={this.handleInput("state")}
                        >
                          {this.listStates()}
                        </Select>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} lg={6} className={style.boxKYC_3}>
                      <FileUploadProgress
                        isRequired
                        id="fileupkeyload"
                        key="ex1"
                        url=""
                        onProgress={(e, request, progress) => {
                          console.warn("progress", e, request, progress);
                        }}
                        onLoad={(e, request) => {
                          console.warn("load", e, request);
                        }}
                        onError={(e, request) => {
                          console.warn("error", e, request);
                        }}
                        onAbort={(e, request) => {
                          console.warn("abort", e, request);
                        }}
                        formGetter={this.formGetter.bind(this)}
                        formRenderer={e =>
                          this.customFormRenderer(
                            e,
                            i18n.t("KYC_UPLOAD_ADDRESS")
                          )
                        }
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
                        <p> {i18n.t("SECURITY_INSERT_DOC")}</p>
                        <Input
                          classes={{
                            root: classes.root,
                            underline: classes.cssUnderline,
                            input: classes.cssInput
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item className={style.displayBox_3}>
                      <Grid item xs={12} lg={4} className={style.boxKYC_3}>
                        <FileUploadProgress
                          isRequired
                          id="fileupload"
                          key="ex1"
                          url=""
                          onProgress={(e, request, progress) => {
                            console.warn("progress", e, request, progress);
                          }}
                          onLoad={(e, request) => {
                            console.warn("load", e, request);
                          }}
                          onError={(e, request) => {
                            console.warn("error", e, request);
                          }}
                          onAbort={(e, request) => {
                            console.warn("abort", e, request);
                          }}
                          formGetter={this.formGetter.bind(this)}
                          formRenderer={e =>
                            this.customFormRenderer(
                              e,
                              i18n.t("KYC_UPLOAD_FRONT")
                            )
                          }
                          progressRenderer={this.customProgressRenderer.bind(
                            this
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} lg={4} className={style.boxKYC_3}>
                        <FileUploadProgress
                          isRequired
                          id="fileupload"
                          key="ex1"
                          url=""
                          onProgress={(e, request, progress) => {
                            console.warn("progress", e, request, progress);
                          }}
                          onLoad={(e, request) => {
                            console.warn("load", e, request);
                          }}
                          onError={(e, request) => {
                            console.warn("error", e, request);
                          }}
                          onAbort={(e, request) => {
                            console.warn("abort", e, request);
                          }}
                          formGetter={this.formGetter.bind(this)}
                          formRenderer={e =>
                            this.customFormRenderer(
                              e,
                              i18n.t("KYC_UPLOAD_BACK")
                            )
                          }
                          progressRenderer={this.customProgressRenderer.bind(
                            this
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} lg={4} className={style.boxKYC_3}>
                        <FileUploadProgress
                          isRequired
                          id="fileupload"
                          key="ex1"
                          url="http://localhost:6000/api/upload"
                          onProgress={(e, request, progress) => {
                            console.warn("progress", e, request, progress);
                          }}
                          onLoad={(e, request) => {
                            console.warn("load", e, request);
                          }}
                          onError={(e, request) => {
                            console.warn("error", e, request);
                          }}
                          onAbort={(e, request) => {
                            console.warn("abort", e, request);
                          }}
                          formGetter={this.formGetter.bind(this)}
                          formRenderer={e =>
                            this.customFormRenderer(
                              e,
                              i18n.t("KYC_UPLOAD_SELFIE")
                            )
                          }
                          progressRenderer={this.customProgressRenderer.bind(
                            this
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <center>
                      <Grid item xs={12} sm={6}>
                        {enableButtonConfirm ? (
                          <button className={style.buttonEnableSecurity}>
                            {i18n.t("BTN_CONFIRM")}
                          </button>
                        ) : (
                          <button
                            disabled
                            className={style.buttonDisabledSecurity}
                          >
                            {i18n.t("BTN_CONFIRM")}
                          </button>
                        )}
                      </Grid>
                    </center>
                  </Grid>
                </Grid>{/**grid wrapperKYC */}
              </Grid>{/**Grid coitainerKYC */}
            </Grid>{/*Grid class allSecurity */}
          </Grid>{/*Primeiro grid*/ }
        </div>
      </div>
    );
  }
}

KYC.propTypes = {
  classes: PropTypes.object.isRequired,
  getKyc: PropTypes.func,
  kyc: PropTypes.object.isRequired
};
const mapStateToProps = store => ({
  kyc: store.settings.kyc
});
const mapDispatchToProps = dispatch => bindActionCreators({ getKyc }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(inputStyle)(KYC));
