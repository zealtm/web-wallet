import React from "react";
// MATERIAL UI
import { Grid, Input } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { withStyles } from "@material-ui/core/styles";

// STYLE
import style from "./style.css";
import colors from "../../../../components/bases/colors";

const inputStyle = {
    root: {
        borderRadius: "10px",
        backgroundColor: "#6351a8",
        color: colors.messages.info,
        margin: "10px",
        padding: "10px",
        width: "calc(100% - 20px)",
        "&:hover:before": {
            borderBottomColor: colors.purple.dark
        }
    },
    cssInput: {
        fontFamily: "Noto Sans, sans-serif",
        fontSize: "17px",
        letterSpacing: "0.5px",
        textAlign: "left"
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
class Header extends React.Component {
    renderPainelExplosion = () => {
        const { classes } = this.props;
        return (
            <div>
                <ExpansionPanel style={{ backgroundColor: "#473088" }}>
                    <ExpansionPanelSummary expandIcon={<img src="../../images/icons/arrow/expand-more@2x.png" />} />

                    <ExpansionPanelDetails>
                        <Grid container className={style.cardContainer} direction="row" justify={"center"}>
                            <Grid item xs={4} lg={4} xl={5} direction="row">
                                <div className={style.card}><div className={style.textGreen}>compra</div>
                                    <p><img src="../../images/icons/coins/lunes.png" className={style.iconCoin} />Lunes</p>
                                </div>

                            </Grid>
                            <Grid item xs={2} lg={2} xl={2} direction="row">
                            </Grid>
                            <Grid item xs={4} lg={4} xl={5} direction="row">
                                <div className={style.card}><div className={style.textGreen}>Pagamento</div>
                                    <p><img src="../../images/icons/coins/btc.png" className={style.iconCoin} />Bitcoin</p>
                                </div>
                            </Grid>
                            <Grid container justify={"center"}>
                                <Grid item xs={12} lg={12} xl={12}>
                                    <Input placeholder="DESCRIÇÃO"
                                        classes={{
                                            root: classes.root,
                                            underline: classes.cssUnderline,
                                            input: classes.cssInput
                                        }} />
                                </Grid>
                                <Grid item xs={12} lg={12} xl={12}>
                                    <Input placeholder="sd5646d5d4s6sdscd1234cvd56"
                                        classes={{
                                            root: classes.root,
                                            underline: classes.cssUnderline,
                                            input: classes.cssInput
                                        }} />
                                </Grid>
                                <Grid item xs={4} lg={4} xl={5} direction="row">
                                    <button className={style.buttonGreen}>Vender</button>
                                </Grid>
                                <Grid item xs={2} lg={2} xl={2} direction="row">

                                </Grid>
                                <Grid item xs={4} lg={4} xl={5} direction="row">
                                    <button className={style.buttonBlue}>Escroow</button>
                                </Grid>
                            </Grid>
                        </Grid>

                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
    renderPainelBuy = () => {
        return (
            <div>
                <Grid container className={style.cardContainer} direction="row" justify={"center"}>
                    <Grid item xs={4} lg={4} xl={5} direction="row">
                        <div className={style.card}><div className={style.textSmall}>20.00000</div></div>
                    </Grid>
                    <Grid item xs={2} lg={2} xl={2} direction="row">
                        <img src="../../images/icons/arrow/arrow-green-right@1x.png" style={{ alignItems: "right" }} />
                    </Grid>
                    <Grid item xs={4} lg={4} xl={5} direction="row">
                        <div className={style.card}><div className={style.textSmall}>R$650,00</div></div>
                    </Grid>

                </Grid>
            </div>
        );
    }
    render() {
        return (
            <div className={style.topBar} >
                <div lassName={style.header}>
                    <Grid container>
                        <Grid item md={1} xl={1}>
                            <img src="../../images/icons/arrow/arrow-white-left@1x.png" />
                        </Grid>
                        <Grid item xs={1} lg={1} xl={1}>
                            <Avatar
                                alt="Avatar"
                                src={"images/lunio/lunio-user@100x100.jpg"}
                            />
                        </Grid>
                        <Grid item xs={4} lg={3} xl={5}>
                            <div><h1 className={style.textGreen} >Ricardo Lopez</h1>
                                <p>25/09/2018</p></div>

                        </Grid>
                        <Grid item xs={4} lg={3} xl={5}>
                            <div>Rating</div>
                        </Grid>
                    </Grid>
                </div>
                {this.renderPainelBuy()}
                {this.renderPainelExplosion()}
            </div>
        );
    }
}
export default withStyles(inputStyle)(Header);