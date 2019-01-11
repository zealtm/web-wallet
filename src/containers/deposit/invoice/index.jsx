import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPackages } from "../redux/depositAction";

// COMPONENTS
import CardPack from "../cardPack";
import { Grid, Hidden, IconButton } from "@material-ui/core";

import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";

// UTILS
import i18n from "../../../utils/i18n";

// STYLE
import style from "./style.css";

class Invoice extends React.Component {
  componentDidMount() {
    const { getPackages } = this.props;
    getPackages();
  }
  moveSlide = (direction = "next") => {
    if (direction === "prev") this.slider.slickPrev();
    else this.slider.slickNext();
  };

  renderPacks = () => {
    const { packages } = this.props;

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
          <Grid
            item
            xs={12}
            className={style.transparentBox}
            style={{ marginTop: "10px" }}
          >
            <button className={style.buttonBorderGreen}>
              {i18n.t("DEPOSIT_TAB_TITLE")}
            </button>
          </Grid>
          <Grid
            item
            xs={12}
            className={style.transparentBox}
            style={{ marginTop: "10px" }}
          >
            <div className={style.information}>
              <a href="#">
                {i18n.t("COUPON_INSTRUCTIONS")}
                <img
                  src="/images/icons/recharge/ic_instrucoes.png"
                  alt={i18n.t("COUPON_INSTRUCTIONS")}
                />
              </a>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Invoice.propTypes = {
  getPackages: PropTypes.func
};

const mapStateToProps = store => ({
  packages: store.deposit.packages
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPackages
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoice);
