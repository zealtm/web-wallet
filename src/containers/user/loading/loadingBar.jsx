import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

// STYLE
import style from "../style.css";

//MATERIAL
// import colors from "../../../components/bases/colors";

const styles = {
    root: {
        flexGrow: 1,
    },
    palette: {
        primary: {
            main: '#43a047',
        },
        secondary: {
            main: 'blue',
        },
    },
};

function LinearIndeterminate() {
    return (
        <div className={style.alignLoadingContainer}>
            <div className={style.itemsLoadingContainer}>
                <img src="../../images/logo.svg" className={style.logoLoading} />
                
                <div >
                    <LinearProgress color="secondary" />
                </div>

                <p>Carregando...</p>
            </div>
        </div>
    );
}

LinearIndeterminate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearIndeterminate);
