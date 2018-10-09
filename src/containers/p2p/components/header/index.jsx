import React from "react";
import PropTypes from "prop-types";
// MATERIAL UI
import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { Star } from "@material-ui/icons/";
// STYLE
import style from "./style.css";

class Header extends React.Component {

   
    render() {
        return (
            <div className={style.topBar} >
                <div lassName={style.header}>
                    <Grid container>
                        <Grid item item xs={1}>
                            <img src="../../images/icons/arrow/arrow-white-left@1x.png" />
                        </Grid>
                        <Grid item item xs={2}>
                            <Avatar
                                alt="Avatar"
                                className={style.avatar}
                                src={"images/lunio/lunio-user@100x100.jpg"}
                            />
                        </Grid>
                        <Grid item xl={5}>
                        <span className={style.name}>Ricardo Lopez</span>
                        <span className={style.textSmall}>00/00/2018</span>
                        <div className={style.card}><div className={style.textSmall}>20.00000</div>                            
                        </div>
                        </Grid>
                        <img src="../../images/icons/arrow/arrow-green-right@1x.png" style={{ alignItems: "right" }} />
                        <Grid xl={5}style={{ paddingLeft: 10 }}>
                            <br />
                            <div className={style.boxStar}>
                                <Star className={style.starActive} />
                                <Star className={style.starActive} />
                                <Star className={style.starActive} />
                                <Star className={style.starActive} />
                                <Star className={style.star} />
                            </div>
                            <div className={style.card}><div className={style.textSmall}>R$650,00</div></div>
                        </Grid>
                        <Grid item item xs={1}>
                            E3
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}
Header.propTypes = {}
export default (Header);