import React from "react";

// UTILS
//import i18n from "../../utils/i18n";

// COMPONENTS
import ChatBar from "./chatBar"
import MenuLeft from "./menuLeft";
// STYLE
import style from "../style.css";
// MATERIAL UI
import Grid from "@material-ui/core/Grid";


class Chat extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <Grid xs={12} container>
                    <ChatBar />
                    <MenuLeft />
                    <div className={style.boxContainer}>
                        <Grid item xs={12} container>
                            <div className={style.cardHome}>

                            </div>
                        </Grid>
                    </div>
                </Grid>
            </div>
        );
    }
}
export default Chat;