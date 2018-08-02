import React from "react";

//MATERIAL UI 
import Grid from "@material-ui/core/Grid";
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
        return (
            <AppBar position="static">
                <Toolbar className={style.header}>
                    <Hidden mdUp>
                        <Grid xs={2} sm={1}>
                            <IconButton color="inherit" aria-label="Menu">
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                    </Hidden>
                    <Grid xs={2} sm={3}>
                        <img src="../../images/logo.svg" className={style.logo} />
                    </Grid>
                    <Grid xs={8} sm={9}>
                        <div className={style.iconNotification}>
                            <IconButton color="inherit" aria-label="Notifications">
                                <Notifications />
                            </IconButton>
                        </div>  
                        <div className={style.boxBalance}>
                            <Hidden smDown>Balance: </Hidden>
                            <span className={style.textBalance}> {" "}
                                <span className={style.textGreen}>LUNES</span> 1,300.00
                            </span>
                            <span className={style.balanceFiat}>$ 130.00</span>
                        </div>
                    </Grid>
                    <Hidden smDown>
                        <Grid sm={1}>
                            <Avatar alt="Avatar" src="https://loremflickr.com/80/80" />
                        </Grid>
                    </Hidden>
                        
                </Toolbar>
            </AppBar>
        )
    }
}

export default Header;