import React from "react";
import style from "../style.css";
// MATERIAL UI
import { Grid, Hidden } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";


class ChatBar extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className={style.topBar}>
                <Grid container direction="row">
                    
                    <Grid item xs={6} sm={4}>
                        <Grid direction="column" xs={12} sm={12}>
                            <Avatar
                                alt="Avatar"
                                src={"images/lunio/lunio-user@100x100.jpg"}
                                className={style.avatarHeader}
                            />
                        </Grid>
                        <Grid>
                            <h1 className={style.textGreen}>Felipe Mendes</h1>
                            <p>filipe.mendes@lunes.io</p>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} sm={2}>
                        <Hidden mdUp>
                            <button className={style.buttonBorderRed}>{'X'}</button>
                        </Hidden>
                    </Grid>
                    <Grid item xs={3} sm={2}>
                        <h1 className={style.textGreen}>Empresa</h1>
                        <p>Lunes Platform</p>
                    </Grid>
                    <Grid item xs={3} sm={2}>
                        <h1 className={style.textGreen}>Cargo</h1>
                        <p>Product Owner</p>
                    </Grid>
                    <Grid item xs={3} sm={2}>
                        <Hidden mdDown>
                            <button className={style.buttonBorderRed}>{'X'}</button>
                        </Hidden>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default ChatBar;