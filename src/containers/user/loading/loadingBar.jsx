import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

// STYLE
import style from "../style.css";

const styles = {
    root: {
        flexGrow: 1,
    },
};

function LinearIndeterminate() {
    return (
        <div className={style.screenLoadingContainer}>
            <img src="../../images/logo.svg" className={style.logoLoading} />
            <LinearProgress />
            <p>Carregando...</p>
        </div>
    );
}

LinearIndeterminate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearIndeterminate);
