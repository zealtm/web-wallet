import React from "react";
import {Link} from "react-dom";
import PropTypes from "prop-types";

//MATERIAL UI 
import {withStyles} from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

//STYLE
import style from "./style.css";

const classes = {
  muiMenu: {
    marginTop:48, 
  }, 
  boxHeaderUser: { 
    fontSize:14, 
    minWidth:160, 
    padding:16
  }, 
  linkMenu: {
    fontSize:11,
    paddingBottom:5,
    paddingTop:5
  }, 
  dividerMenu: {
    borderBottom:'solid 1px #ccc',
    borderTop:'none',
    margin:0
  }
};


class UserControl extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      openBox: null, 
      avatar: 'https://loremflickr.com/80/80',
    }
  }

  handleClick = event => {
    this.setState({...this.state, openBox: event.currentTarget });
  };

  handleClose = () => {
    this.setState({...this.state, openBox: null });
  };

  render(){
    const {avatar, openBox} = this.state;
    const {classes} = this.props;

    return (
      <div>
        <Avatar 
          alt="Avatar" 
          src={avatar} 
          className={style.avatarHeader}
          aria-controls="menuUser" 
          onClick={this.handleClick} />

          {/* <div style={
            {
              backgroundColor: '#fff',
              padding:16,
              dropShadow: '10px 10px 10px rgba(0,0,0,.3)',
              position: 'absolute',
              width: 200,
              top:64,
              right:16,
            }
          }>
          asdasdasdasdasdasdasd
          </div> */}

          <Menu
            id="menuUser"
            className={classes.muiMenu}
            anchorEl={openBox}
            open={Boolean(openBox)}
            onClose={this.handleClose} >
              <div className={classes.boxHeaderUser}>
                Olá, Thiago
              </div>
              <MenuItem onClick={this.handleClose} className={classes.linkMenu}>Privacidade</MenuItem>
              <MenuItem onClick={this.handleClose} className={classes.linkMenu}>Configuração</MenuItem>
              <MenuItem onClick={this.handleClose} className={classes.linkMenu}>Suporte</MenuItem>
              <hr className={classes.dividerMenu} />
              <MenuItem onClick={this.handleClose} className={classes.linkMenu}>Sair</MenuItem>
          </Menu>
      </div>
    );
  }
}

UserControl.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(classes)(UserControl);