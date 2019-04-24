import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// REDUX
import { connect } from "react-redux";

//MATERIAL UI
import Hidden from "@material-ui/core/Hidden";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";
import { Grid } from "@material-ui/core";
import {ArrowDropDown} from '@material-ui/icons';
//STYLE
import style from "./style.css";

//COMPONENTS
import UserControl from "./userControl.jsx";
import LogoLunes from "../../components/logoLunes";

//UTILS
import { TESTNET } from "../../constants/apiBaseUrl";
import { getDefaultFiat, getDefaultCrypto } from "../../utils/localStorage";
import i18n from "../../utils/i18n";
import { convertBiggestCoinUnit } from "../../utils/numbers";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openBalancePopup: false,
      notifications: 0
    };
  }

  handleClick = () => {
    this.setState({
      ...this.state,
      openBalancePopup: !this.state.openBalancePopup
    });
  };

  renderBalancePopup = () => {
    const { openBalancePopup } = this.state;
    const { actionLogout, credit, coins } = this.props;
    let coinSelected = getDefaultCrypto();
    let fiatSelected = getDefaultFiat();

    let coinName = coins[coinSelected]
      ? coins[coinSelected].abbreviation.toUpperCase()
      : "UNDEFINED";

    let coinBalance =
      coins[coinSelected] && coins[coinSelected].balance
        ? coins[coinSelected].balance.available
        : "-";

    let coinFiat =
      coins[coinSelected] && coins[coinSelected].price
        ? (coins[coinSelected].price["BRL"].price * coinBalance).toFixed(2)
        : 0;

    let coinFiatSymbol =
      coins[coinSelected] && coins[coinSelected].price
        ? coins[coinSelected].price[fiatSelected].symbol
        : "";

    if (openBalancePopup) {
      setTimeout(() => {
        this.setState({ ...this.state, openBalancePopup: false });
      }, 8000);
      let total =
        Number(coinFiat) + convertBiggestCoinUnit(credit.available, 8);

      return (
        <div className={style.menuUserDeposit}>
          <div className={style.arrowUp} />

          <div>
            <p className={style.textBalanceDeposit}>
              {i18n.t("MY_BALANCE_DEPOSIT")}
            </p>
            <span className={style.boxBalanceDeposit}>
              <img
                src="../../images/icons/deposit/balance_deposit-2x.png"
                className={style.imgBalanceDeposit}
                style={{ "max-width": "31px", "max-height": "31px" }}
              />
              <p>{convertBiggestCoinUnit(credit.available, 8).toFixed(2)}</p>
              <div style={{ position: "relative", top: "8px", left: "8%" }}>
                <Link to="/deposit">
                  <button className={style.btnBalanceDeposit}>
                    {i18n.t("MENU_DEPOSIT")}
                  </button>
                </Link>
              </div>
            </span>
          </div>

          <div>
            <span className={style.boxBalanceDeposit}>
              <img
                src="../../images/icons/deposit/balance_deposit-2.png"
                className={style.imgBalanceDeposit}
              />
              <p>{coinBalance + " " + coinName}</p>
            </span>
            <p className={style.texGreentBalanceDeposit}>
              {i18n.t("AMOUNT_CREDIT") + total.toFixed(2)}
            </p>
          </div>
        </div>
      );
    }
  };

  renderNotifications = () => {
    const { notifications } = this.state;

    if (notifications > 0) {
      return (
        <div className={style.iconNotificationActive}>
          <IconButton color="inherit" aria-label="Notifications">
            <Badge badgeContent color="secondary" width="5px" height="5px">
              <img
                src="/images/icons/general/bell@1x.png"
                alt=""
                height="25px"
                width="25px"
                classes={{ width: "50px" }}
              />
              {/* <Notifications  /> */}
            </Badge>
          </IconButton>
        </div>
      );
    } else {
      return (
        <div className={style.iconNotification}>
          <IconButton color="inherit" aria-label="Notifications">
            <img
              src="/images/icons/general/bell@1x.png"
              height="25px"
              width="25px"
              alt=""
            />
          </IconButton>
        </div>
      );
    }
  };

  renderBalance = () => {
    let { coins, credit } = this.props;
    let coinSelected = getDefaultCrypto();
    let fiatSelected = getDefaultFiat();

    let coinName = coins[coinSelected]
      ? coins[coinSelected].abbreviation.toUpperCase()
      : "UNDEFINED";

    let coinBalance =
      coins[coinSelected] && coins[coinSelected].balance
        ? coins[coinSelected].balance.available
        : "-";

    let coinFiatSymbol =
      coins[coinSelected] && coins[coinSelected].price
        ? coins[coinSelected].price[fiatSelected].symbol
        : fiatSelected;

    let coinFiat =
      coins[coinSelected] && coins[coinSelected].price
        ? (coins[coinSelected].price[fiatSelected].price * coinBalance).toFixed(
            2
          )
        : "-";
    let creditBalance = convertBiggestCoinUnit(credit.available, 8).toFixed(2);
    return (
      <Grid
        container
        justify="flex-end"
        spacing={8}
        className={style.boxBalance}
      >
        <Grid item>
          <Hidden xsDown>
            <Link to="/deposit">
              <button className={style.btnBalanceDeposit}>
                {i18n.t("MENU_DEPOSIT")}
              </button>
            </Link>
          </Hidden>
        </Grid>
        <Grid item>
          <Hidden xsDown>
            <span
              className={style.textBalanceTitle}
              onClick={() => this.handleClick()}
            >
              {i18n.t("WALLET_MY_AMOUNT")}
            </span>
          </Hidden>
          {creditBalance > 0 ? (
            <div style={{ display: "inline" }}>
              <div className={style.creditBalanceBox}>
                <img
                  className={style.iconCoin}
                  src={"images/icons/coins/whiteIcons/lbrl.png"}
                />
                <span
                  className={style.textBalance}
                  onClick={() => this.handleClick()}
                >
                  {creditBalance}
                </span>
              </div>

              <Hidden xsDown>
                <div className={style.verticalLine} />
              </Hidden>
            </div>
          ) : null}

          <img
            className={style.iconCoin}
            src={"images/icons/coins/whiteIcons/" + coinSelected + ".png"}
          />

          <span
            className={style.textBalance}
            onClick={() => this.handleClick()}
          >
            {coinBalance}
          </span>
          <span
            className={style.textBalanceFiat}
            onClick={() => this.handleClick()}
          >
            {coinFiatSymbol + " " + coinFiat}
            <ArrowDropDown className={style.ArrowDropDown}/>
          </span>
          
          {this.renderBalancePopup()}
        </Grid>
      </Grid>
    );
  };

  render() {
    const { actionMenu, actionLogout } = this.props;

    return (
      <AppBar position="static">
        <Toolbar className={style.header}>
          <Hidden lgUp>
            <div className={style.menuHamb}>
              <IconButton
                color="inherit"
                aria-label="Menu"
                onClick={actionMenu}
              >
                <MenuIcon />
              </IconButton>
            </div>
          </Hidden>
          <div className={style.boxLogo}>
            <LogoLunes />
            {!TESTNET || <span className={style.textGreen}>Testnet</span>}
          </div>
          {this.renderBalance()}

          <Hidden mdDown>
            <UserControl actionLogout={actionLogout} />
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  actionMenu: PropTypes.func.isRequired,
  actionLogout: PropTypes.func.isRequired,
  coins: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  credit: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

const mapSateToProps = store => ({
  coins: store.skeleton.coins,
  credit: store.skeleton.creditBalance
});

export default connect(
  mapSateToProps,
  null
)(Header);
