import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { autoPlay } from "react-swipeable-views-utils";
import MobileStepper from "@material-ui/core/MobileStepper";
import SwipeableViews from "react-swipeable-views";
import { Grid } from "@material-ui/core";
import i18n from "../../utils/i18n";
import style from "./style.css";

const styles = {
    dot: {
        background: "#907db2",
        width: 10.2,
        height: 10,
        marginRight: 10
    },
    dots: {
        marginTop: 40,
        marginLeft: "auto",
        marginRight: "auto"
    },
    dotActive: {
        background: "#fff"
    },
    root: {
        background: "none"
    }
};

var imageDirectory = "/images/carousel/";

const imageSteps = [
    {
        label: i18n.t("LOGIN_SLIDE_DESCRIPTION_1"),
        imgPath:imageDirectory +"carousel-01.png"
    },
    {
        label: i18n.t("LOGIN_SLIDE_DESCRIPTION_2"),
        imgPath: imageDirectory + "/carousel-02.png"
    },
    {
        label: i18n.t("LOGIN_SLIDE_DESCRIPTION_3"),
        imgPath: imageDirectory + "/carousel-03.png"
    }
];

const maxSteps = imageSteps.length;

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

class Carousel extends Component {
    constructor() {
        super();
        this.state = {
            activeStep: 0
        };
    }

    stepChange = activeStep => {
        this.setState({ activeStep });
    };

    render() {
        const { classes } = this.props;
        return (
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <AutoPlaySwipeableViews
                        className={style.center}
                        index={this.state.activeStep}
                        onChangeIndex={this.stepChange}
                        enableMouseEvents>

                        {imageSteps.map((item, index) => (
                            <div className={style.paragraph} key={index}>
                                <img className={style.imageResponsive} src={item.imgPath} alt={item.label} />
                                <p>
                                    <label>{item.label}</label>
                                </p>
                            </div>
                        ))}

                    </AutoPlaySwipeableViews>
                    <MobileStepper
                        steps={maxSteps}
                        position="static"
                        activeStep={this.state.activeStep}
                        classes={{
                            dots: classes.dots,
                            dot: classes.dot,
                            dotActive: classes.dotActive,
                            root: classes.root
                        }}
                    />
                </Grid>
            </Grid>
        );
    }
}

Carousel.protoTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Carousel);