import React from "react";
import Grid from "@material-ui/core/Grid";
import i18n from "../../utils/i18n";
import style from "./style.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";


class LeasingHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleHistory: undefined
    };
  }

  stateDataHistory = key => {
    let { toggleHistory } = this.state;
    this.setState({
      toggleHistory: toggleHistory === key ? undefined : key
    });
  };

  renderBtCancel = status => {
    if (status === 1) {
      return (
        <div className={style.iconLeasing}>
          <img src="images/icons/general/leasing@1x.png" />
          {i18n.t("LEASING_BT_CANCEL")}
        </div>
      );
    } else {
      return null;
    }
  };



  renderHistory = () => {
    let mapHistoryItems = [{},{},{},{},{},{},{},{},{},{}];
    let { toggleHistory } = this.state;
    return mapHistoryItems.map((val, index) => {
      return (
        <div key={index}>
          <div>
            <Grid item xs={12}
              className={
                toggleHistory !== undefined && toggleHistory !== index
                  ? style.opacityItem
                  : style.itemHistorico
              }
              onClick={() => this.stateDataHistory(index)}
            >
              <Grid item xs={3}>
                12 dec 18 16h22
              </Grid>
              <Grid item xs={3}>
                <span className={style.textGreen}>1,000.00</span>
              </Grid>
              <Grid item xs={4}>
                odyx.me
              </Grid>
              <Grid item xs={2}>
                {this.renderBtCancel(1)}
              </Grid>
            </Grid>

            <div>
              <Grid
                item
                xs={12}
                className={toggleHistory !== index ? style.toggleHistory : null}
              >
                <Grid item xs={12} className={style.itemDataHistorico}>
                  <Grid item xs={12} className={style.descriptionHistory}>
                    <div>{i18n.t("LEASING_TITLE_EXPLORER")}</div>
                    <a href="#" target="parent">
                      ayudegwdwef54ew68fv46fgdrg5effjbhekyf
                    </a>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        
        <Grid container className={style.containerTransactions}>
          <Grid container
            item xs={11} sm={10} md={10}>
            <Grid item xs={6} md={4}>
              <div className={style.boxCard}>
                {i18n.t("LEASING_BALANCE_LABEL")}
                <div className={style.strongText}>142,5 milhões de LUNES</div>
              </div>
            </Grid>
            <Grid item xs={6} md={4}>
              <div className={style.boxCard}>
                {i18n.t("LEASING_BALANCE_ACTIVE")}
                <div className={style.strongTextGreen}>300,000 LUNES</div>
              </div>
            </Grid>

            <Grid item xs={12} md={4}>
              <button className={style.buttonEnable}>
                {i18n.t("LEASING_TITLE_NEW")}
              </button>
            </Grid>
          </Grid>
          <Grid item xs={11} sm={10} md={10}>
            <div className={style.contentTransactions}>
              <Grid container className={style.headerContent}>
                <Grid item xs={3}>
                  {i18n.t("LEASING")}
                </Grid>
                <Grid item xs={3}>
                  {i18n.t("LEASING_TITLE_AMOUNT")}
                </Grid>
                <Grid item xs={4}>
                  {i18n.t("LEASING_TITLE_NODE")}
                </Grid>
                <Grid item xs={2}>
                  {i18n.t("LEASING_TITLE_STATUS")}
                </Grid>
              </Grid>
              {this.renderHistory()}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

LeasingHistory.propTypes = {
  coins: PropTypes.array.isRequired
}

const mapSateToProps = store => (console.warn(store.skeleton.coins),{
  coins: store.skeleton.coins
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(LeasingHistory);
