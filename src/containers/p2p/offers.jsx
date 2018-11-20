import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getMyOrders, getHistory, getFilter } from "./redux/p2pAction";

// MATERIA UI
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// STYLE
import style from "./style.css";
import colors from "../../components/bases/colors";

// COMPONENTS
import CardOffer from "./components/cardOffer";
import Select from "../../components/select";
import Loading from "../../components/loading";

// UTILS
import i18n from "../../utils/i18n";

const inputStyle = {
  root: {
    color: colors.messages.info,
    padding: "5px",
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
    borderRadius: "6px",
    border: "solid 1px #654fa4",
    fontSize: "11px",
    height: "20px",
    maxHeight: "20px",
    backgroundImage: "url(images/icons/p2p/search.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "95% center",
    backgroundColor: colors.purple.default,
    "&:hover:before": {
      borderBottom: "none"
    }
  },
  cssInput: {
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "12px",
    letterSpacing: "0.5px"
  },
  cssUnderline: {
    "&:before, &:after": {
      borderBottom: "none"
    },
    "&:hover:not($disabled):not($error):not($focused):before": {
      borderBottom: "none"
    }
  },
  disabled: {},
  error: {},
  focused: {}
};
class Offers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabGiving: true,
      tabDone: false,
      coinSelect: {
        name: "Lunes",
        value: "lunes",
        img: "images/icons/coins/lunes.png"
      },
      myOrders: false
    };

    this.filterMyOrders = this.filterMyOrders.bind(this);
  }

  coinSelected = (value, title, img = undefined) => {
    this.setState({
      ...this.state,
      coinSelect: {
        name: title,
        value,
        img
      }
    });

    this.filterMyOrders(false);
  };

  onChangeTab(status) {
    if (status == 1) {
      this.setState({ ...this.state, tabGiving: false, tabDone: true });
    } else {
      this.setState({ ...this.state, tabGiving: true, tabDone: false });
    }
  }

  componentDidMount = () => {
    const { getFilter, getHistory, type } = this.props;
    const { coinSelect } = this.state;

    if (type === "myhistory") {
      getHistory(coinSelect.value);
    } else {
      getFilter(coinSelect.value, "p2p", "");
    }
  };

  renderOders = () => {
    const { orders, loading, type } = this.props;

    if (loading) return <Loading color="lunes" margin={"50% 0% 0% 0%"} />;

    if (orders.length <= 0) return (<div className={style.noOrder}>
      <h1>{i18n.t("P2P_NO_ORDER")}</h1>
    </div> );

    return orders.map((val, key) => {
      return <CardOffer key={key} order={val} type={type} />;
    });
  };

  filterMyOrders = filtermyorder => {
    const { getFilter, getMyOrders, getHistory, type } = this.props;
    const { coinSelect, myOrders } = this.state;
    if (myOrders == false) {
      getMyOrders(coinSelect.value);
    } else {
      if (type != "myhistory") {
        getFilter(coinSelect.value, "p2p", "");
      } else {
        getHistory(coinSelect.value);
     }
    }

    if (filtermyorder) {
      this.setState({
        ...this.state,
        myOrders: !myOrders
      });
    }
  };

  renderFilters = () => {
    const { type } = this.props;
    const { tabGiving, tabDone } = this.state;

    if (type === "myhistory") {
      return (
        <div className={style.tabContent}>
          <div
            className={tabGiving ? style.itemTab : style.itemTabActive}
            onClick={() => this.onChangeTab(1)}
          >
            {i18n.t("P2P_STATUS_TEXT_1")}
          </div>
          <div
            className={tabDone ? style.itemTab : style.itemTabActive}
            onClick={() => this.onChangeTab(0)}
          >
            {i18n.t("P2P_STATUS_TEXT_2")}
          </div>
        </div>
      );
    }

    return;
  };

  render() {
    const { coinsEnabled } = this.props;
    const { coinSelect, myOrders } = this.state;

    const activeButton = myOrders
      ? style.buttonEnable
      : style.buttonBorderGreen;

    return (
      <div>
        <div className={style.headerActionFilter}>
          <Grid container>
            <Grid item xs={7}>
              <div className={style.headerSelect}>
                <Select
                  list={coinsEnabled}
                  title={coinSelect.name}
                  titleImg={coinSelect.img}
                  selectItem={this.coinSelected}
                  error={null}
                  width={"89%"}
                />
              </div>
            </Grid>
            <Grid item xs={5}>
              <button
                className={activeButton}
                onClick={() => this.filterMyOrders(true)}
              >
                {i18n.t("P2P_MY_LISTING")}
              </button>
            </Grid>
          </Grid>
        </div>

        {this.renderFilters()}

        <div className={style.content}>{this.renderOders()}</div>
      </div>
    );
  }
}

Offers.propTypes = {
  classes: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
  coinsEnabled: PropTypes.array.isRequired,
  orders: PropTypes.array.isRequired,
  getFilter: PropTypes.func,
  getMyOrders: PropTypes.func,
  getHistory: PropTypes.func,
  loading: PropTypes.bool,
  type: PropTypes.string
};

const mapStateToProps = store => ({
  coinsEnabled: store.p2p.coinsEnabled || [],
  orders: store.p2p.orders,
  loading: store.p2p.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMyOrders,
      getHistory,
      getFilter
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(inputStyle)(Offers));
