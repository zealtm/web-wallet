// Deve unir o Header e Menu Lateral
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// COMPONENTS 
import Header from "./header";
import Home from "../home/index";

// MATERIAL UI 
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Avatar from '@material-ui/core/Avatar';

// STYLE
import style from "./style.css";

// array itens menu
const menuItens = [
    {
        link: "/",
        label: "Home",
        icon: "../../images/icons/home/home@1x.png",
    },
    {
        link: "/wallet",
        label: "Wallet",
        icon: "../../images/icons/wallet/wallet@1x.png",
    },
    {
        link: "/boleto",
        label: "Boletos",
        icon: "../../images/icons/home/home@1x.png",
    },
];

class Skeleton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { openMenu: false };
    }

    renderMenu = () => {
        return menuItens.map((item, key) => {
            return (
                <Link className={style.linkMenu} to={item.link} key={key}>
                    <img src={item.icon} className={style.iconMenu} />{item.label}
                </Link>
            )
        });
    }

    toggleMenu = () => {
        this.setState({ ...this.state, openMenu: !this.state.openMenu });
    }

    render() {
        const { openMenu } = this.state;
        return (
            <div>
                <Header actionMenu={this.toggleMenu} />
                <Grid container>
                    <Grid item md={2}>
                        <div className={style.colMenu} style={{ left: + (openMenu) ? ' 0px ' : '-232px' }}>
                            <Hidden lgUp>
                                <Grid container className={style.boxUserMenu}>
                                    <Grid item xs={4} align="center">
                                        <Avatar alt="Avatar" src="https://loremflickr.com/80/80" />
                                    </Grid>
                                    <Grid item xs={8}>
                                        Nome Usuario<br />
                                        <Link to="/logout" className={style.link}>Logout</Link>
                                    </Grid>
                                </Grid>
                            </Hidden>
                            {this.renderMenu()}
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={10} className={style.teste}>

                        <div className={style.colContainer}>
                            <Home />
                        </div>

                    </Grid>
                </Grid>
            </div>
        );
    }
}

Skeleton.propTypes = {
    children: PropTypes.Component
};

export default Skeleton;