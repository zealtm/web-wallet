import React from "react";
import style from "../style.css";
// MATERIAL UI
import { Grid } from "@material-ui/core";
class MenuLeft extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className={style.menuBar}>
                <Grid container direction="row">
                    <h1>Olá</h1>
                </Grid>
            </div>
        );
    }
}
export default MenuLeft;