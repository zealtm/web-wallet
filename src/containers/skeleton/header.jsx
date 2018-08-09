import React from "react";
import PropTypes from "prop-types";

//MATERIAL UI
import Hidden from "@material-ui/core/Hidden";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Notifications from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';

//STYLE 
import style from "./style.css";

//COMPONENTS
import UserControl from './userControl.jsx';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            notifications: 1,
        };
    }

    renderNotifications = () => {
        const { notifications } = this.state;
        
        if (notifications > 0){
            return (
                <div className={style.iconNotificationActive}>
                    <IconButton color="inherit" aria-label="Notifications">
                        <Badge badgeContent={notifications} color="secondary">
                            <Notifications className={style.animeNotification}/>
                        </Badge>
                    </IconButton>
                </div>
            );
        }else{
            return (
                <div className={style.iconNotification}>
                    <IconButton color="inherit" aria-label="Notifications">
                        <Notifications />
                    </IconButton>
                </div>
            );
        }
    }

    render() {
        const { actionMenu } = this.props;
        return (
            <AppBar position="static">
                <Toolbar className={style.header}>
                    <Hidden lgUp>
                        <div className={style.menuHamb}>
                            <IconButton color="inherit" aria-label="Menu" onClick={actionMenu}>
                                <MenuIcon />
                            </IconButton>
                        </div>
                    </Hidden>
                    <div className={style.boxLogo}>
                        <img src="../../images/logo.svg" className={style.logo} />
                    </div>
                    <div className={style.boxBalance}>
                        <Hidden xsDown>
                            <span className={style.textGreen}>Balance </span>
                        </Hidden>
                        <span className={style.textBalance}> 8,004 mil LUNES</span>
                        <span className={style.textBalanceFiat}>$ 300.01</span>
                    </div>
                    
                    <Hidden xsDown>
                        {this.renderNotifications()}
                    </Hidden>
                    
                    <Hidden mdDown>
                        <UserControl />
                    </Hidden>
                </Toolbar>
            </AppBar>
        )
    }
}


Header.propTypes = {
    actionMenu: PropTypes.func.isRequired
};

export default Header;