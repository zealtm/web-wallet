import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink, withRouter } from "react-router-dom";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Avatar from "@material-ui/core/Avatar";

// STYLE
import style from "./style.css";

// array itens menu
const menuItens = [
  {
    link: "/home",
    label: "Home",
    icon: "../../images/icons/home/home@1x.png"
  },
  {
    link: "/wallet",
    label: "Wallet",
    icon: "../../images/icons/wallet/wallet@1x.png"
  },
  {
    link: "/boleto",
    label: "Boletos",
    icon: "../../images/icons/home/home@1x.png"
  }
];

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  renderMenu = () => {
    let { pathname } = this.props.location;
    
    return menuItens.map((item, key) => {
      let classStyle = style.linkMenu;

      if(item.label === "Home" && (pathname === "/" || pathname === "/home")) {
        classStyle = style.linkMenu + " " + style.linkMenuActive
      }

      return (
        <NavLink
          className={classStyle}
          activeClassName={style.linkMenuActive}
          to={item.link}
          key={key}
        >
          <img src={item.icon} className={style.iconMenu} />
          {item.label}
        </NavLink>
      );
    });
  };

  render() {
    const { openMenu } = this.props;
    return (
      <div
        className={style.colMenu}
        style={{ left: +openMenu ? " 0px " : "-232px" }}
      >
        <Hidden lgUp>
          <Grid container className={style.boxUserMenu}>
            <Grid item xs={4} align="center">
              <Avatar alt="Avatar" src="https://loremflickr.com/80/80" />
            </Grid>
            <Grid item xs={8}>
              Nome Usuario<br />
              <Link to="/logout" className={style.link}>
                Logout
              </Link>
            </Grid>
          </Grid>
        </Hidden>
        {this.renderMenu()}
      </div>
    );
  }
}

Menu.propTypes = {
  openMenu: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(Menu);
