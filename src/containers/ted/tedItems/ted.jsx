import React from "react";
import i18n from "../../../utils/i18n";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getCoinsEnabled
} from "./../../payment/redux/paymentAction";

// COMPONENTS
import Select from "../../../components/select";
import Instructions from "../../../components/instructions";
import colors from "../../../components/bases/colors";
import Loading from "../../../components/loading";
import { CpfMask, MoneyBrlMask } from "../../../components/inputMask";

// MATERIAL
import { Grid, Input } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// STYLES
import style from "../style.css";

// UTILS
import { inputValidator } from "../../../utils/inputValidator";

const customStyle = {
    inputRoot: {
        color: colors.messages.info,
        margin: "0.5rem 0",
        padding: "5px",
        width: "calc(100% - 20px)",
        "&:hover:before": {
            borderBottomColor: colors.purple.dark
        }
    },
    inputCss: {
        color: colors.messages.info,
        fontFamily: "Noto Sans, sans-serif",
        fontSize: "14px",
        letterSpacing: "0.5px",
        textAlign: "left",
        "&::placeholder": {
            fontSize: "1.2vh",
            opacity: "1"
        }
    },
    inputCssCenter: {
        fontFamily: "Noto Sans, sans-serif",
        fontSize: "16px",
        letterSpacing: "0.5px",
        textAlign: "center"
    },
    inputCssUnderline: {
        "&:before, &:after": {
            borderBottomColor: colors.purple.dark
        },
        "&:hover:not($disabled):not($error):not($focused):before": {
            borderBottomColor: `${colors.purple.dark} !important`
        }
    },
    inputCssUnderlineDisabled: {
        "&:before, &:after": {
            display: "none"
        }
    },
    disabled: {},
    error: {},
    focused: {}
};

class Ted extends React.Component {
    constructor() {
        super();
        this.state = {
            errors: [],
            disableNumberInput: false,
            tedLoading: false,
            ted: {
                banco: "",
                tipo: "",
                agencia: "",
                operacao: "",
                conta: "",
                nomeRazao: "",
                cpfcnpj: "",
                value: "",
                coin: {
                    abbreviation: "",
                    address: ""
                }
            },
            coin: {
                name: undefined,
                value: undefined,
                img: undefined
            }
        };

        this.coinSelected = this.coinSelected.bind(this);
        this.coinSelected = this.coinSelected.bind(this);

    }
    componentDidMount() {
        const { getCoinsEnabled } = this.props;
        getCoinsEnabled();
    }

    coinSelected = (value, title, img = undefined) => {
        const { ted } = this.state;

        this.setState({
            ...this.state,
            coin: {
                name: title,
                value,
                img
            },
            ted: {
                ...ted,
                coin: value
            }
        });
    };

    setDefaultState = () => {
        const emptyValue = {
            banco: "",
            tipo: "",
            agencia: "",
            operacao: "",
            conta: "",
            nomeRazao: "",
            cpfcnpj: "",
            value: "",
            coin: {
                abbreviation: "",
                address: ""
            }
        };

        this.setState({
            ...this.state,
            ted: emptyValue,
            coin: {
                name: undefined,
                value: undefined,
                img: undefined
            }
        });
    };
    inputValidator = () => {
        const { ted, coin } = this.state;
        const tedData = {
            ...ted,
            banco: ted.banco,
            tipo: ted.tipo,
            agencia: ted.agencia,
            operacao: ted.operacao,
            conta: ted.conta,
            nomeRazao: ted.nomeRazao,
            cpfcnpj: ted.cpfcnpj,
            value: ted.value
          };
      
          const tedInputs = {};
      
          for (const key in tedData) {
            if (tedData.hasOwnProperty(key)) {
                tedInputs[key] = {
                type: key === "dueDate" ? "date" : "text",
                name: key,
                placeholder: key,
                value: tedData[key],
                required: true
              };
            }
          }
      
          const coinInput = {
            type: "text",
            name: "coin",
            placeholder: "coin",
            value: tedData.coin.abbreviation || coin.name || "",
            required: true
          };
      
          const { errors } = inputValidator({ ...tedInputs, coin: coinInput });
      
          if (errors.length > 0) {
            this.setState({
              ...this.state,
              errors
            });
            return;
          }

    }
    handleTedDefaultChange = name => event => {
        this.setState({
          ...this.state,
          ted: {
            ...this.state.ted,
            [name]: event.target.value
          }
        });
      };

    render() {
        const { classes, loading, coinsRedux} = this.props;
        const { coin, errors,ted } = this.state;

        const title = coin.name || "Select a coin..";

        return (
            <Grid container justify="center" >
                <Grid container className={style.box}>
                    <Grid item xs={6}>
                        <Select
                        list={coinsRedux}
                        selectItem={this.coinSelected}
                        title={i18n.t("TED_INPUT_BANCK")}
                        style={{ backgroundColor: "black !important" }}
                        error={errors.includes("banco")}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <Select
                        list={coinsRedux}
                        selectItem={this.coinSelected}
                        itle={i18n.t("TED_INPUT_TYPE_TED")}
                        error={errors.includes("tipo")}
                        />
                    </Grid>

                    <Grid item xs={12} style={{ display: "flex" }}>
                        <Grid item xs={3}>
                            <Input
                                classes={{
                                    root: classes.inputRoot,
                                    underline: classes.inputCssUnderline,
                                    input: classes.inputCss
                                }}
                                value={ted.agencia}
                                placeholder={i18n.t("TED_INPUT_AG_TED")}
                                onChange={this.handleTedDefaultChange("agencia")}
                                error={errors.includes("agencia")}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Input
                                classes={{
                                    root: classes.inputRoot,
                                    underline: classes.inputCssUnderline,
                                    input: classes.inputCss
                                }}
                                value={ted.operacao}
                                placeholder={i18n.t("TED_INPUT_OP_TED")}
                                onChange={this.handleTedDefaultChange("operacao")}
                                error={errors.includes("operacao")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Input
                                classes={{
                                    root: classes.inputRoot,
                                    underline: classes.inputCssUnderline,
                                    input: classes.inputCss
                                }}
                                value={ted.conta}
                                placeholder={i18n.t("TED_INPUT_ACC")}
                                onChange={this.handleTedDefaultChange("conta")}
                                error={errors.includes("conta")}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            classes={{
                                root: classes.inputRoot,
                                underline: classes.inputCssUnderline,
                                input: classes.inputCss
                            }}
                            value={ted.nomeRazao}
                            placeholder={i18n.t("TED_INPUT_NAME")}
                            onChange={this.handleTedDefaultChange("nomeRazao")}
                            error={errors.includes("nomeRazao")}
                        />
                    </Grid>

                    <Grid item xs={12} style={{ display: "flex" }}>
                        <Grid item xs={6} >
                            <Input
                                classes={{
                                    root: classes.inputRoot,
                                    underline: classes.inputCssUnderline,
                                    input: classes.inputCss
                                }}
                                value={ted.cpfcnpj}
                                placeholder={i18n.t("TED_INPUT_CPF_CNPJ")}
                                error={errors.includes("cpfCnpj")}
                                inputComponent={CpfMask}
                                onChange={this.handleTedDefaultChange("cpfcnpj")}
                                error={errors.includes("cpfcnpj")}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Input
                                classes={{
                                    root: classes.inputRoot,
                                    underline: classes.inputCssUnderline,
                                    input: classes.inputCss
                                }}
                                value={ted.value}
                                placeholder={i18n.t("TED_INPUT_VALUE")}
                                inputComponent={MoneyBrlMask}
                                onChange={this.handleTedDefaultChange("value")}
                                error={errors.includes("value")}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} className={style.box} style={{ marginTop: "10px" }}>
                    <Grid container>
                        <Grid item xs={12} sm={6} >
                            <Select
                                list={coinsRedux}
                                selectItem={this.coinSelected}
                                title={title}                                
                                error={errors.includes("coin")}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid
                    item
                    xs={12}
                    className={style.transparentBox}
                    style={{ marginTop: "10px" }}
                >
                    <button
                        className={style.buttonBorderGreen}
                        onClick={this.inputValidator}
                    >
                        {loading ? <Loading /> : i18n.t("PAYMENT_PAY_NOW")}
                    </button>
                </Grid>

                <Grid item xs={12}
                    className={style.transparentBox}
                    style={{ marginTop: "10px" }}
                >
                    <Instructions>
                        {/* TODO: set the modal content */}
                        <p>Conteúdo</p>
                    </Instructions>
                </Grid>
            </Grid>
        );
    }
}

Ted.propTypes = {
    classes: PropTypes.object,
    coinsRedux: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    getCoinsEnabled: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
    coinsRedux: store.payment.coins,
    payment: store.payment.payment,
    loading: store.payment.loading
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getCoinsEnabled
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(customStyle)(Ted));
