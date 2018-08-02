// Deve unir o Header e Menu Lateral
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// COMPONENTS 
import Header from "./header";

// MATERIAL UI 
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

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

    renderMenu = () => {
        return menuItens.map((item,key) => {
            return (
                <Link className={style.link} to={item.link} key={key}>
                    <img src={item.icon} />{item.label}
                </Link>
            )
        });
    }

    render() {
        const { children } = this.props;
        return (
            <div>
            <Header />
            <Grid container>
                <Hidden smDown>
                    <Grid xs={12} sm={12} md={2}>
                        <div className={style.colMenu}>
                            {this.renderMenu()}
                        </div>
                    </Grid>
                </Hidden>
                <Grid xs={12} sm={12} md={10}>
                    <div className={style.colContainer}>
                        {children}
                    </div>
                </Grid>
            </Grid>
            </div>
        );
    }
}

Skeleton.propTypes = {
    children: PropTypes.any
};

export default Skeleton;