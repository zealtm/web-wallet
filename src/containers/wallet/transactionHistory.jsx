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
            toggleHistory: undefined
        };
    }

    stateDataHistory = (key) => {
        let { toggleHistory } = this.state
        this.setState({
            toggleHistory: toggleHistory === key ? undefined : key
        })
    }

    renderHistory = () => {
        let mapHistoryItems = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]
        let { toggleHistory } = this.state;

        return mapHistoryItems.map((val, index) => {
            return (
                <div key={index}>
                    <div>
                        <Grid item xs={12} className={toggleHistory !== undefined && toggleHistory !== index ? style.opacityItem : style.itemHistorico} onClick={() => this.stateDataHistory(index)}>
                            <Grid item xs={2} className={style.typeItems}>
                                <div><img src="./images/icons/indicatorsHistory/submit.png" /></div>
                                <div className={style.dateHistory}> {"12/mar"} </div>
                            </Grid>
                            <Grid item xs={6} className={style.descriptionHistory}>
                                {"Digite descrição curta para sua transação"}
                            </Grid>
                            <Grid item xs={4} className={style.valueHistory}>
                                <div className={style.submitHistory}> {"+0.00020521"} </div>
                                <div> {"$ 421.00"} </div>
                            </Grid>
                        </Grid>

                        <div>
                            <Grid item xs={12} className={toggleHistory !== index ? style.toggleHistory : null} >
                                <Grid item xs={12} className={style.itemDataHistorico}>
                                    <Grid item xs={2}> </Grid>
                                    <Grid item xs={6} sm={7} >
                                        <div className={style.titleBlockExplorer}>{"Blockexplorer"}</div>
                                    </Grid>
                                    <Grid item xs={4} sm={3} className={style.alignTimeInValueHistory}>
                                        <div className={style.timeInValueHistory}>
                                            <div> {" 10:32:15 AM "}</div>
                                        </div>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid item xs={12} className={style.itemDataHistorico}>
                                        <Grid item xs={2} className={style.typeItems}>
                                            <div> {"ID"} </div>
                                        </Grid>
                                        <Grid item xs={10} className={style.descriptionHistory}>
                                            <div>{"ayudegwdwef54ew68fv46fgdrg5effjbhekyf"}</div>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} className={style.itemDataHistorico}>
                                        <Grid item xs={2} className={style.typeItems}>
                                            <div className={style.fromTransactionHistory}> {"De:"} </div>
                                        </Grid>
                                        <Grid item xs={10} >
                                            <div className={style.fromTransactionHistory}>{"ayudegwdwef54ew68fv46effjbhekyf"}</div>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} className={style.itemDataHistorico}>
                                        <Grid item xs={2} className={style.typeItems}>
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
            <div >
                <Grid className={style.containerTransactions}>
                    <Grid item xs={11} sm={7} md={6}>

                        <div className={style.alignItemsHeaderHistory} >
                            <div className={style.refleshIcon}>
                                <img src="images/icons/general/refresh.png" />
                            </div>
                            <div className={style.text}>
                                {i18n.t("TRANSACTION_HISTORY_TITLE")}
                            </div>
                        </div>

                        <div className={style.contentTransactions}>
                            {this.renderHistory()}
                        </div>

                    </Grid>
                </Grid>
            </div>

        );
    }
}


export default TransactionHistory;
