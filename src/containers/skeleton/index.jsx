import React from "react";
import PropTypes from "prop-types";

// COMPONENTS 
import Header from "./header";
import Menu from "./menu";

// MATERIAL UI 
import Grid from "@material-ui/core/Grid";

// STYLE
import style from "./style.css";

class Skeleton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {openMenu: false};
    }

    toggleMenu = () => {
        this.setState({...this.state, openMenu:!this.state.openMenu});
    }

    render() {
        const { children } = this.props;
        const { openMenu } = this.state;
        return (
            <div>
                <Header actionMenu={this.toggleMenu} />
                <Grid container>
                    <Grid item md={2}>
                        <Menu openMenu={openMenu} />
                    </Grid>
                    <Grid item xs={12} lg={10}>
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
    children: PropTypes.element.isRequired
};

export default Skeleton;