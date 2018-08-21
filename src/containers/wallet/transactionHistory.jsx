import React from "react";

// STYLE
import style from "./style.css";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";


// UTILS
import i18n from "../../utils/i18n";


class TransactionHistory extends React.Component {
    constructor() {
        super();
        this.state = {
            toogleHistory: undefined
        };
    }

    stateDataHistory = (key) => {
        let { toogleHistory } = this.state
        this.setState({
            toogleHistory: toogleHistory === key ? undefined : key
        })
    }

    renderHistory = () => {
        let teste = [{ }, { }]
        let { toogleHistory } = this.state;

        return teste.map((val, index) => {
            return (
                <div key={index}>
                    <div>
                        <Grid item xs={12} className={style.itemHistorico} onClick={() => this.stateDataHistory(index)}>
                            <Grid item xs={2} className={style.items}>
                                <div><img src="./images/icons/indicatorsHistory/receive.png" /></div>
                                <div className={style.dateHistory}> {"12/mar"} </div>
                            </Grid>
                            <Grid item xs={6} className={style.descriptionHistory}>
                                {"Digite descrição curta para sua transação"}
                            </Grid>
                            <Grid item xs={4} className={style.valueHistory}>
                                <div className={style.receiveHistory}> {"+0.00020521"} </div>
                                <div> {"$ 421.00"} </div>
                            </Grid>
                        </Grid>

                        <div>
                            <Grid item xs={12} className={toogleHistory !== index ? style.testeao : null} >
                                <Grid item xs={12} className={style.itemDataHistorico}>
                                    <Grid item xs={2}> </Grid>
                                    <Grid item xs={6} >
                                        <div className={style.titleBlockExplorer}>{"Blockexplorer"}</div>
                                    </Grid>
                                    <Grid item xs={4} className={style.valueHistory}>
                                        <div className={style.timeHistory}> {" 10:32:15 AM "} </div>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid item xs={12} className={style.itemDataHistorico}>
                                        <Grid item xs={2} className={style.items}>
                                            <div> {"ID"} </div>
                                        </Grid>
                                        <Grid item xs={10} className={style.descriptionHistory}>
                                            <div>{"ayudegwdwef54ew68fv46fgdrg5effjbhekyf"}</div>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} className={style.itemDataHistorico}>
                                        <Grid item xs={2} className={style.items}>
                                            <div className={style.fromTransactionHistory}> {"De:"} </div>
                                        </Grid>
                                        <Grid item xs={10} >
                                            <div className={style.fromTransactionHistory}>{"ayudegwdwef54ew68fv46effjbhekyf"}</div>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} className={style.itemDataHistorico}>
                                        <Grid item xs={2} className={style.items}>
                                            <div className={style.forTransactionHistory}> {"Para:"} </div>
                                        </Grid>
                                        <Grid item xs={10} >
                                            <div className={style.forTransactionHistory}>{"ayudegwdwef54ew68fv46effjbhekyf"}</div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            )
        })
    };

    render() {
        return (
            <div>
                <div className={style.text}> {i18n.t("TRANSACTION_HISTORY_TITLE")} </div>
                <div className={style.nivel1}>
                    <Grid item xs={12} sm={7} className={style.nivel2}>
                        <Grid item xs={11} md={10} className={style.nivel3}>
                            {this.renderHistory()}
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}


export default TransactionHistory;
