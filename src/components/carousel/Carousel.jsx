import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { autoPlay } from "react-swipeable-views-utils";
import MobileStepper from "@material-ui/core/MobileStepper";
import SwipeableViews from "react-swipeable-views";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = {
    dot: {
        background: "#ccc",
        width: 20,
        height: 20
    },
    dots: {
        marginLeft: "auto",
        marginRight: "auto"
    },
    dotActive: {
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
    }
};

const tutorialSteps = [
    {
        label: "How to be happy :)",
        imgPath:
            "data:image/png;base64,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"
    },
    {
        label: "1. Work with something that you like, like…",
        imgPath:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPLkCykICqy6d3EyZxJ8kaspeAUIIN2VY4Yf9IZvCescfcQU-g"
    },
    {
        label: "2. Keep your friends close to you and hangout with them",
        imgPath:
            "data:image/png;base64,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"
    },
    {
        label: "3. Travel everytime that you have a chance",
        imgPath:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9l58vRacNhdg4VmXEs9gQRtVRWg0aiaCZBfLIGnZnH6DlYNNnwA"
    },
    {
        label: "4. And contribute to Material-UI :D",
        imgPath:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGIcS7PPLR2nc-_Eql6PkCF6NAFDp0lGEdaxpKRk-lESB1XDaZjQ"
    }
];

const maxSteps = tutorialSteps.length;

class Carousel extends React.Component {

    constructor() {
        super();
        this.state = { activeStep: 0 };
    }

    handleStepChange = (activeStep) => {
        this.setState({ activeStep });
    }

    render() {
        const classes = this.props;

        return (
            <section>
                <AutoPlaySwipeableViews
                    index={this.state.activeStep}
                    onChangeIndex={this.handleStepChange}
                    enableMouseEvents>
                    {tutorialSteps.map((item, index) => (
                        <div key={index}>
                            <img src={item.imgPath} alt={item.label} />
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
                        dotActive: classes.dotActive
                    }}
                />
            </section>
        );
    }
}

Carousel.PropTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Carousel);