import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";

// MATERIAL ICONS
import {KeyboardArrowLeft, KeyboardArrowRight, ArrowDropDown, ArrowDropUp, Close} from "@material-ui/icons";

// UTILS
import i18n from "../../../../utils/i18n";

// STYLE
import style from "./style.css";

class CoinsBar extends React.Component {
  constructor(props) {
    super(props);
  }

  moveSlide = (direction = "next") => {
    if (direction === "prev") this.slider.slickPrev();
    else this.slider.slickNext();
  };

  renderArrowPercent = val => {
    if (parseFloat(val) < 0) {
      return <ArrowDropDown className={style.arrowPercentDown} />;
    } else {
      return <ArrowDropUp className={style.arrowPercentUp} />;
    }
  };

  renderPacks = () => {
    return ["15","30", "50", "100", "1000"].map((val, index) => {
      return (
        <div key={index}>
          {val}
        </div>
      );
    });
  };

  render() {
    let settings = {
      arrows: false,
      draggable: true,
      dots: false,
      infinite: false,
      speed: 200,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1279,
          settings: {
            slidesToShow: 5
          }
        },
        {
          breakpoint: 959,
          settings: {
            slidesToShow: 5
          }
        },
        {
          breakpoint: 599,
          settings: {
            slidesToShow: 4
          }
        }
      ]
    };

    return (
      <div>
        <Grid container style={{ justifyContent: "center" }}>
          <Hidden xsDown>
            <Grid item xs={1} className={style.arrowControl}>
              <IconButton
                color="inherit"
                aria-label={i18n.t("TEXT_PREV")}
                onClick={() => this.moveSlide("prev")}
              >
                <KeyboardArrowLeft />
              </IconButton>
            </Grid>
          </Hidden>

          <Grid item xs={12} sm={10}>
            <Slider ref={c => (this.slider = c)} {...settings}>
              {this.renderPacks()}
            </Slider>
          </Grid>

          <Hidden xsDown>
            <Grid item xs={1} className={style.arrowControl}>
              <IconButton
                color="inherit"
                aria-label={i18n.t("TEXT_PREV")}
                onClick={() => this.moveSlide()}
              >
                <KeyboardArrowRight />
              </IconButton>
            </Grid>
          </Hidden>
        </Grid>
      </div>
    );
  }
}

export default CoinsBar;