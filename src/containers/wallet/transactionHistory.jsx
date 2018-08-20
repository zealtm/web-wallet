import React from "react";

// STYLE
import style from "./style.css";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";

// UTILS
import i18n from "../../utils/i18n";

class TransactionHistory extends React.Component {
    render() {
        return (
            <div className={style.containerWallet}>
                <div className={style.text}>
                    {i18n.t("TRANSACTION_HISTORY_TITLE")}
                </div>
                <div className={style.nivel1}>
                    <Grid item xs={12} sm={7} className={style.nivel2}>
                        <Grid item xs={11} sm={11} className={style.nivel3}>
                            <div>DEUS ME AJUDA, POR FAVOR</div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}


export default TransactionHistory;
