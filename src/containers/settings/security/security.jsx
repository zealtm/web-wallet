import React from "react";

// STYLE
import style from "../style.css";

// MATERIAL UI 
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden"

// UTILS
import i18n from "../../../utils/i18n";

// COMPONENTS
import InputSecurity from "./inputSecurity";


class Security extends React.Component {
    render() {
        return (
            <div className={style.containerSecurity}>
                <Grid xs={11} sm={8} >
                    <Grid container className={style.allSecurity}>
                        <Grid item xs={12} className={style.containerItems}>
                            <Hidden smUp>
                                <Grid item xs={6} className={style.columItemsMobile}>
                                    <img src="images/QRCode.png" />
                                </Grid>
                            </Hidden>

                            <Grid item xs={6} sm={12} className={style.semNome}>
                                <Grid item xs={12} sm={3} className={style.columItems}>
                                    <Grid className={style.indicatorItem}>
                                        {"1"} <p>{i18n.t("SECURITY_ITEM_1")}</p>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={3} className={style.columItems}>
                                    <Grid className={style.indicatorItem}>
                                        {"2"} <p> {i18n.t("SECURITY_ITEM_2")} </p>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sm={3} className={style.columItems}>
                                    <Grid className={style.indicatorItem}>
                                        {"3"} <p>{i18n.t("SECURITY_ITEM_3")}</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Hidden xsDown>
                            <Grid container className={style.containerItemsWeb}>
                                <Grid item xs={3} className={style.item}>
                                    <Grid className={style.contendItemSpecific}>
                                        <img src="images/apple@1x.png" />
                                        <br />
                                        <img src="images/google-play@1x.png" />
                                    </Grid>
                                </Grid>

                                <Grid item xs={3} className={style.item}>
                                    <Grid className={style.contendItem}>
                                        <img src="images/QRCode.png" />
                                    </Grid>
                                </Grid>

                                <Grid item xs={3} className={style.item}>
                                    <Grid className={style.contendItem}>
                                        <Grid item>
                                            <InputSecurity />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Hidden>

                        <Hidden smUp>
                            <Grid container className={style.columItemsMobile}>
                                <InputSecurity />
                                <Grid item xs={12} className={style.alignLaunchMobile} >
                                    <img src="images/apple@1x.png" />
                                    <img src="images/google-play@1x.png" />
                                </Grid>
                            </Grid>
                        </Hidden>

                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Security;