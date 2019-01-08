import React from "react";
import Slider from "react-slick";

// COMPONENTS
import CardPack from "./cardPack";
import { Grid, Hidden, IconButton } from "@material-ui/core";

import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";

// UTILS
import i18n from "../../utils/i18n";

// STYLE
import style from "./style.css";

class Invoice extends React.Component {
  moveSlide = (direction = "next") => {
    if (direction === "prev") this.slider.slickPrev();
    else this.slider.slickNext();
  };

  renderPacks = () => {
    const packages = [15, 30, 45, 60, 100, 250, 500, 1000];

    return packages.map((val, index) => {
      return <CardPack key={index} pack={val} />;
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
            slidesToShow: 3
          }
        },
        {
          breakpoint: 959,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 599,
          settings: {
            slidesToShow: 2
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

          <Grid item xs={12} sm={10} style={{ minHeight: 300 }}>
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

Invoice.propTypes = {};

export default Invoice;
