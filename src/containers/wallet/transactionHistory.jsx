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
            <div className={style.containerInfoCoins}>
                <Grid item xs={12} sm={7}>
                    <div>   {i18n.t("TRANSACTION_TITLE")}  </div>
                    <div className={style.mainContainerHistory}>
                        enviar
                    </div>
                </Grid>

            </div>
        );
    }
}


export default TransactionHistory;
