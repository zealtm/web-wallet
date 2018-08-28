import React from "react";

// STYLE
import style from "./style.css";

// MATERIAL UI 
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

// UTILS
// import i18n from "../../utils/i18n";


class Security extends React.Component {
    render() {
        return (
            <div>
                <Grid container className={style.containerSecurity}>
                    <Grid item xs={12} className={style.containerItems}>
                        <Hidden smUp>
                            <Grid item xs={6} className={style.columItemsMobile}>

                                <div style={{ backgroundColor: "white", height: "288px", width: "300px", }} />

                            </Grid>
                        </Hidden>




                        <Grid item xs={6} sm={12} className={style.semNome}>

                            <Grid item xs={12} sm={2} className={style.columItems}>
                                <Grid className={style.indicatorItem}>
                                    1
                                <p>
                                        instale
                                </p>
                                </Grid>
                                <Hidden smDown>
                                    <Grid className={style.item}>
                                        <p>IMAGEMS
                                    <br />#######
                                    <br />#######
                                    <br />#######
                                </p>
                                    </Grid>
                                </Hidden>
                            </Grid>
                            <Grid item xs={12} sm={3} className={style.columItems}>
                                <Grid className={style.indicatorItem}>
                                    2
                                <p>
                                        instale
                                </p>
                                </Grid>
                                <Hidden smDown>
                                    <Grid className={style.item}>
                                        <p>IMAGEMS
                                    <br />#######
                                    <br />#######
                                    <br />#######
                                </p>
                                    </Grid>
                                </Hidden>
                            </Grid>
                            <Grid item xs={12} sm={4} className={style.columItems}>
                                <Grid className={style.indicatorItem}>
                                    3
                                <p>
                                        instale
                                </p>
                                </Grid>
                                <Hidden smDown>
                                    <Grid className={style.item}>
                                        <p>IMAGEMS
                                    <br />#######
                                    <br />#######
                                    <br />#######
                                </p>
                                    </Grid>
                                </Hidden>
                            </Grid>

                        </Grid>

                    </Grid>

                    <Hidden smUp>
                        <Grid container>
                            <Grid item xs={12} className={style.columItemsMobile}>
                                <Grid item xs={12} >
                                    _ _ _
                                </Grid>

                                <Grid item xs={12} >
                                    BOTAO
                                </Grid>

                                <Grid item xs={12} >
                                    img  ## || img  ##
                                </Grid>
                            </Grid>
                        </Grid>
                    </Hidden>

                </Grid>
            </div>
        );
    }
}

export default Security;