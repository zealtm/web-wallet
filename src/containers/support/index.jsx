import React from "react";
//import PropTypes from "prop-types";

// UTILS
//import i18n from "../../utils/i18n";

// COMPONENTS
import SupportBar from "./supportBar";
//import Modal from "../../components/modal";

// STYLE
import style from "./style.css";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";

class Support extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <SupportBar /><br />
                <div className={style.boxContainer}>
                    <Grid container>
                        <div className={style.cardHome}>
                            <h1>{'Nome'}</h1>
                            <h2>{'Damiiao'}</h2>
                        </div>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Support;