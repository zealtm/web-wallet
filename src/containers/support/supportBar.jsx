import React from "react";
// STYLE
import style from "./style.css";
// MATERIAL UI
import { Grid, Button, Hidden } from "@material-ui/core";
// COMPONENTS
import Select from "../../components/select";

class SupportBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={style.topBar}>
                <Grid container direction="row" justify={"center"}>

                    <Grid container direction="row" justify="center" >

                        <Hidden mdUp>
                            <button className={style.buttonBorderGreen}>{'Seus Tikets'}</button>
                        </Hidden>
                        <Select
                            title={'Mudar Tópico'}
                        />
                        <Select
                            className={style.textGreen}
                            title={'Origem do acesso'}
                        />
                        <Select
                            title={'Sistema Operacional'}
                        />
                        <Hidden mdDown>
                            <button className={style.buttonBorderGreen}>{'Seus Tikets'}</button>
                        </Hidden>
                    </Grid>

                </Grid>
            </div>
        );
    }
}
export default SupportBar;