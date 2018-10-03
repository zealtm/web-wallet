import React from "react";
// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
// STYLE
import style from "./style.css";

class Header extends React.Component {
    renderPainelBuy = () => {
        return (
            <div>
                <Grid container className={style.cardContainer} direction="row" justify={"center"}>
                    <Grid item direction="row" justify={"center"}>
                        <div className={style.card}><p>20.00000</p></div>
                        <div className={style.card}><p>R$650,00</p></div>
                    </Grid>
                </Grid>
            </div>
        );
    }
    render() {
        return (
            <div className={style.topBar} >
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
                            <h1 className={style.textSmall}>25/09/2018</h1></div>

                    </Grid>
                    <Grid item xs={4} lg={3} xl={5}>
                        <div>Rating</div>
                    </Grid>
                </Grid>
                {this.renderPainelBuy()}
            </div>
        );
    }
}
export default Header;