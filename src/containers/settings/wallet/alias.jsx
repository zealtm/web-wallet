import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { errorInput } from "../../errors/redux/errorAction";
import { createAlias, getAliases } from "../redux/settingsAction";
import i18n from "../../../utils/i18n";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import style from "./style.css";
import { convertSmallerCoinUnit } from "../../../utils/numbers";

class AliasPage extends React.Component {
  constructor() {
    super();

    this.state = {
      fieldAlias: ""
    };
  }

  handleAliasValue = value => {
    this.setState({ fieldAlias: value });
  };

  componentDidMount() {
    let { coins, getAliases } = this.props;
    let address = coins.lunes.address;
    console.warn("COMPONENT DID MOUNTCH", address);
    if (address) {
      console.warn("foi", address);
      getAliases(address);
    }
  }

  createNewAlias = () => {
    let { createAlias, coins, settings, user } = this.props;
    let { fieldAlias } = this.state;

    let coinName = coins.lunes.abbreviation;
    let coinAddress = coins.lunes.address;
    let decimalPoint = coins.lunes.decimalPoint;
    let fee = convertSmallerCoinUnit(settings.coinFee.low, decimalPoint);
    let password = user.password;
    createAlias(coinName, coinAddress, fieldAlias, fee, password);
  };

  render() {
    let { coins } = this.props;
    let { fieldAlias } = this.state;

    return (
      <div>
        <Hidden smUp>
          <div className={style.description}>
            {" "}
            {i18n.t("SET_ALIAS_DESCRIPTION")}{" "}
          </div>
        </Hidden>

        <div className={style.box}>
          <Hidden xsDown>
            <div className={style.description}>
              {" "}
              {i18n.t("SET_ALIAS_DESCRIPTION")}{" "}
            </div>
          </Hidden>
          <Grid container justify="center" spacing={16}>
            <Grid item xs={11} md={2}>
              <Grid container>
                <Grid item xs={4} md={12}>
                  <img
                    src={`images/icons/coins/lunes.png`}
                    className={style.coinIconAlias}
                  />
                </Grid>
                <Grid item xs={6} md={12}>
                  <div className={style.labelCoin}>
                    {i18n.t("SETTINGS_ALIAS_WALLET_LUNES")}
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={11} md={7}>
              <input
                type="text"
                disabled
                className={style.inputClear}
                value={
                  coins["lunes"]
                    ? coins["lunes"].address
                    : i18n.t("MESSAGE_NOT_SERVICE")
                }
              />
              <div>
                <Grid container className={style.aliasNameRow}>
                  <Grid item xs={12} md={8}>
                    <input
                      type="text"
                      className={style.inputClear}
                      onChange={event =>
                        this.handleAliasValue(event.target.value)
                      }
                      value={fieldAlias}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <button
                      className={style.buttonGreen}
                      onClick={() => this.createNewAlias()}
                    >
                      {i18n.t("SET_ALIAS_SAVE_NAME")}
                    </button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

AliasPage.propTypes = {
  coins: PropTypes.array,
  errorInput: PropTypes.func,
  createAlias: PropTypes.func,
  getAliases: PropTypes.func,
  settings: PropTypes.object,
  user: PropTypes.object
};

const mapSateToProps = store => (
  console.warn(store),
  {
    coins: store.skeleton.coins,
    settings: store.settings,
    user: store.user.user
  }
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createAlias,
      getAliases,
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(AliasPage);
