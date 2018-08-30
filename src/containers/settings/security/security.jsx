import React from "react";
import { Link } from "react-router-dom";

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
                <Grid item xs={11} sm={8} >

                    <Grid container className={style.headerSecurity}>
                        <Hidden smUp>
                            <Grid item xs={12}>
                                <h3>{i18n.t("SECURITY_TITLE")} </h3>
                            </Grid>
                        </Hidden>
                        <Grid item xs={6} sm={2}>
                            <p>{i18n.t("SECURITY_LINK_RETURN")}</p>
                        </Grid>
                        <Hidden xsDown>
                            <Grid item xs={12} sm={3} md={4}>
                                <h3>{i18n.t("SECURITY_TITLE")}</h3>
                            </Grid>
                        </Hidden>

                        <Grid item xs={6} sm={5} id={"hr"}>
                            <hr />
                        </Grid>
                    </Grid>

                    <Grid container className={style.allSecurity}>
                        <Grid item xs={12} className={style.containerItems}>
                            <Hidden smUp>
                                <Grid item xs={6} className={style.columItemsMobile}>
                                    <img src="images/QRCode.png" />
                                </Grid>
                            </Hidden>

                            <Grid item xs={6} sm={12} className={style.counterItems}>
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
                                    <Grid>
                                        <Link to="#">
                                            <img src="images/apple@1x.png" />
                                        </Link>
                                        <br />
                                        <Link to="#">
                                            <img src="images/google-play@1x.png" />
                                        </Link>
                                    </Grid>
                                </Grid>

                                <Grid item xs={3} className={style.item}>
                                    <Grid className={style.contentItem}>
                                        <img src="images/QRCode.png" />
                                    </Grid>
                                </Grid>

                                <Grid item xs={3} className={style.item}>
                                    <Grid className={style.contentItem}>
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
                                    <Link to="#">
                                        <img src="images/apple@1x.png" />
                                    </Link>
                                    <Link to="#">
                                        <img src="images/google-play@1x.png" />
                                    </Link>
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