import React from "react";
import Slider from "react-slick";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";

// MATERIAL ICONS
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";

// STYLE
import style from "./style.css";

// DATA EXEMPLO
const coins = [
  {
    name: "LUNES",
    balance: "$0.005",
    percent: "-1.55%"
  },
  {
    name: "BTC",
    balance: "$8,000.30",
    percent: "8.00%"
  },
  {
    name: "LTC",
    balance: "$200.00",
    percent: "5.25%"
  },
  {
    name: "USDT",
    balance: "$200.00",
    percent: "5.25%"
  },
  {
    name: "DASH",
    balance: "$200.00",
    percent: "5.25%"
  },
  {
    name: "ETH",
    balance: "$200.00",
    percent: "5.25%"
  }
];

class CoinsBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coinActive: null
    };
  }

  selectCoin = coin => {
    this.setState({ coinActive: coin });
  };

  moveSlide = (direction = "next") => {
    if (direction === "prev") this.slider.slickPrev();
    else this.slider.slickNext();
  };

  renderArrowPercent = val => {
    const percent = parseFloat(val);
    if (percent < 0) {
      return <ArrowDropDown className={style.arrowPercentDown} />;
    } else {
      return <ArrowDropUp className={style.arrowPercentUp} />;
    }
  };

  renderCoins = () => {
    return coins.map((val, index) => {
      return (
        <div
          className={style.baseBoxCoin}
          key={index}
          onClick={() => this.selectCoin(val.name)}
        >
          <div
            className={
              this.state.coinActive === val.name
                ? style.boxCoinActive
                : style.boxCoin
            }
          >
            <div className={style.boxIconCoin}>
              <img
                className={style.iconCoin}
                src={`images/coins/${val.name}.png`}
              />
            </div>
            <Hidden smDown>
              <div className={style.boxLabelCoin}>
                {val.balance} <br />
                <div className={style.labelPercent}>
                  {this.renderArrowPercent(val.percent)}
                  {val.percent}
                </div>
              </div>
            </Hidden>
            <Hidden mdUp>
              <div className={style.boxArrowPercent}>
                {this.renderArrowPercent(val.percent)}
              </div>
            </Hidden>
          </div>
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
      slidesToShow: 6,
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
      <div className={style.contentCoins}>
        <Grid container style={{ justifyContent: "center" }}>
          <Hidden xsDown>
            <Grid item xs={1} className={style.arrowControl}>
              <IconButton
                color="inherit"
                aria-label="Prev"
                onClick={() => this.moveSlide("prev")}
              >
                <KeyboardArrowLeft />
              </IconButton>
            </Grid>
          </Hidden>

          <Grid item xs={12} sm={10}>
            <Slider ref={c => (this.slider = c)} {...settings}>
              {this.renderCoins()}
            </Slider>
          </Grid>

          <Hidden xsDown>
            <Grid item xs={1} className={style.arrowControl}>
              <IconButton
                color="inherit"
                aria-label="Prev"
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
