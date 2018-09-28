import React from "react";

// UTILS
//import i18n from "../../utils/i18n";

// COMPONENTS
import SupportBar from "./supportBar";
// STYLE
import style from "./style.css";
// MATERIAL UI
import Grid from "@material-ui/core/Grid";

import Ticket from './ticket';

class Support extends React.Component {
    constructor() {
        super();
    }
    render() {        
        return (
            <div>
                <SupportBar /><br />
                <div className={style.boxContainer}>
                    <Grid item xs={12} container>
                        <div className={style.cardHome}>
                            <Ticket />
                        </div>
                    </Grid>
                </div>
            </div>
        );
    }
}
export default Support;