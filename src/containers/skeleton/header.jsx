import React from "react";

//MATERIAL UI
import Hidden from "@material-ui/core/Hidden";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Notifications from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';

//STYLE 
import style from "./style.css";

class Header extends React.Component {
    render() {
        const { actionMenu } = this.props;
        return (
            <AppBar position="static">
                <Toolbar className={style.header}>
                    <Hidden lgUp>
                        <IconButton color="inherit" aria-label="Menu" onClick={actionMenu}>
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <div className={style.boxLogo}>
                        <img src="../../images/logo.svg" className={style.logo} />
                    </div>
                    <div className={style.boxBalance}>
                        <Hidden xsDown>
                            <span className={style.textGreen}>Balance:</span>
                        </Hidden>
                        <span className={style.textBalance}> {" "}1,300.00 LUNES</span>
                    </div>
                    <div className={style.iconNotification}>
                        <IconButton color="inherit" aria-label="Notifications">
                            <Notifications />
                        </IconButton>
                    </div>
                    <Hidden mdDown>
                        <Avatar alt="Avatar" src="https://loremflickr.com/80/80" />
                    </Hidden>
                </Toolbar>
            </AppBar>
        )
    }
}

/// adicionar PropTypes

export default Header;