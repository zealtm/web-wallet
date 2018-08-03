import React from "react";
import PropTypes from "prop-types";

//MATERIAL UI
import Hidden from "@material-ui/core/Hidden";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Notifications from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

//STYLE 
import style from "./style.css";

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            avatar: 'https://loremflickr.com/80/80',
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
        const { avatar } = this.state;
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
                            <span className={style.textGreen}>Balance </span>
                        </Hidden>
                        <span className={style.textBalance}> 8,004 mil LUNES</span>
                        <span className={style.textBalanceFiat}>$ 300.01</span>
                    </div>
                    
                    <Hidden xsDown>
                        {this.renderNotifications()}
                    </Hidden>
                    
                    <Hidden mdDown>
                        <Avatar alt="Avatar" src={avatar} className={style.avatarHeader} />
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